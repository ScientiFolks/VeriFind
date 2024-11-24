import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { searchLiterature } from '../../services/api';
import 'react-toastify/dist/ReactToastify.css';

function Find() {
    const [searchText, setSearchText] = useState('');
    const [resultCount, setResultCount] = useState(5);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    const handleResultCountChange = (e) => {
        const value = parseInt(e.target.value);
        setResultCount(Math.min(Math.max(value, 1), 100));
    };

    const handleSubmit = async () => {
        if (searchText.trim() === '') {
            toast.error('Please enter a search query', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        setIsSubmitted(true);
        setIsLoading(true);
        setCurrentPage(1);

        try {
            const results = await searchLiterature(searchText, resultCount);
            setSearchResults(results.data);
        } catch (error) {
            toast.error('An error occurred while fetching results. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const LiteratureItem = ({ title, url, summarized_text }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const maxLength = 200; // Maximum number of characters to show initially
        
        const toggleExpand = () => {
            setIsExpanded(!isExpanded);
        };
    
        const truncatedText = summarized_text.slice(0, maxLength);
        const shouldTruncate = summarized_text.length > maxLength;
    
        return (
            <div className="mb-8 md:mb-12">
                <h3 className="text-xl md:text-2xl font-bold text-yellow-fig hover:text-gray-2 transition-colors duration-300">
                    <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
                </h3>
                <p className="text-green-500 text-xs md:text-sm mb-1 hover:underline">
                    <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                </p>
                <div className="text-gray-2 text-sm md:text-base">
                    <p>{isExpanded ? summarized_text : truncatedText}
                        {shouldTruncate && (
                            <>
                                {!isExpanded && '...'}
                                <button 
                                    onClick={toggleExpand}
                                    className="ml-2 text-yellow-fig hover:text-gray-2 font-semibold transition-colors duration-300"
                                >
                                    {isExpanded ? 'Show less' : 'Show more'}
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </div>
        );
    };
    
    const LiteratureResults = ({ results }) => {
        const startIndex = (currentPage - 1) * 10;
        const endIndex = startIndex + 10;
        const currentResults = results.slice(startIndex, endIndex);

        return (
            <div className="mt-8 md:mt-12 px-2 md:px-4 w-full max-w-full overflow-x-hidden">
                {currentResults.map((item, index) => (
                    <LiteratureItem key={index} {...item} />
                ))}
                <Pagination totalPages={Math.ceil(results.length / 10)} />
            </div>
        );
    };

    const Pagination = ({ totalPages }) => {
        if (totalPages <= 1) return null;

        return (
            <div className="flex justify-center mt-8">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-yellow-fig text-white' : 'bg-gray-2'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className={`flex flex-col items-center w-full transition-all duration-300 ${isSubmitted ? 'pt-4' : 'pt-8 md:pt-16'}`}>
            <ToastContainer />
            <div className={`w-full flex flex-col items-center ${isSubmitted ? 'md:flex-row md:justify-between md:items-start md:gap-6' : ''} transition-all duration-300`}>
                <h1 className={`font-black bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 text-transparent bg-clip-text transition-all duration-300 ${isSubmitted ? 'text-4xl mb-4 md:mb-0 md:ml-4' : 'text-6xl md:text-6xl lg:text-8xl mb-4 md:mb-8'}`}>
                    VeriFind
                </h1>
                {!isSubmitted && (
                    <h2 className="text-center md:text-xl text-base text-gray-2 mb-4 md:mb-8 transition-all duration-300">Discover Relevant Research with Ease</h2>
                )}
                <div className={`relative w-full ${isSubmitted ? 'md:w-1/2 md:max-w-xl' : 'max-w-2xl'} transition-all duration-300 mb-4 md:mb-0`}>
                    <textarea
                        value={searchText}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Search for research papers..."
                        className="w-full px-4 py-2 pl-10 pr-4 rounded-2xl border border-gray-2 focus:outline-none focus:ring-2 focus:ring-yellow-fig resize-none overflow-hidden"
                        rows="1"
                        style={{ minHeight: '40px' }}
                        disabled={isLoading}
                    />
                    <FaSearch 
                        className={`absolute left-3 top-3 text-gray-1 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={isLoading ? null : handleSubmit}
                    />
                </div>
                <div className={`flex justify-end items-center transition-all duration-300 ${isSubmitted ? 'md:mr-4' : 'w-full mt-2 md:mt-4 max-w-2xl'}`}>
                    <span className="mr-2 text-gray-2 text-sm md:text-base">Show total results:</span>
                    <input
                        type="number"
                        value={resultCount}
                        onChange={handleResultCountChange}
                        onKeyDown={handleKeyPress}
                        min="1"
                        max="100"
                        className="px-2 py-1 md:px-3 md:py-2 border border-gray-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-fig text-sm md:text-base w-20"
                        disabled={isLoading}
                    />
                </div>
            </div>
            {resultCount > 10 && (
                <p className="text-gradient-1 text-xs md:text-sm mt-4 text-center transition-all duration-300">Warning: Searching for more than 10 results may take significantly longer.</p>
            )}
            {isLoading && (
                <div className="mt-12 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-fig"></div>
                </div>
            )}
            {!isLoading && isSubmitted && searchResults.length > 0 && (
                <LiteratureResults results={searchResults} />
            )}
        </div>
    );
}

export default Find;