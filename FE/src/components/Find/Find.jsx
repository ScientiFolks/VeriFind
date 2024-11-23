import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Find() {
    const [searchText, setSearchText] = useState('');
    const [resultCount, setResultCount] = useState(5);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    };

    const handleResultCountChange = (e) => {
        setResultCount(parseInt(e.target.value));
    };

    const handleSubmit = () => {
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

        // Change this to actual backend request
        // Simulate backend request
        setTimeout(() => {
            setIsLoading(false);
            // Handle search query to backend
            console.log('Searching for:', searchText);
            console.log('Show total results:', resultCount);

            // Simulated search results
            const results = [
                {
                title: "Literature Review and Document Refinement: Ensuring Accuracy and Relevance",
                link: "https://example.com/literature-review",
                summary: "This article discusses techniques for validating sources and revising documents to enhance research quality."
                },
                {
                title: "Improving Research Quality: Literature Validation and Document Revision Techniques",
                link: "https://example.com/research-quality",
                summary: "An in-depth look at methods for ensuring research integrity through comprehensive validation of literature and revision of academic documents."
                },
                {
                title: "VeriDraft: An Intelligent Assistant for Validating Sources and Revising Drafts",
                link: "https://example.com/veridraft",
                summary: "VeriDraft is a smart platform that helps researchers validate literature sources and refine their document drafts."
                },
                {
                title: "Literature Review and Document Refinement: Ensuring Accuracy and Relevance",
                link: "https://example.com/literature-review",
                summary: "This article discusses techniques for validating sources and revising documents to enhance research quality."
                },
                {
                title: "Improving Research Quality: Literature Validation and Document Revision Techniques",
                link: "https://example.com/research-quality",
                summary: "An in-depth look at methods for ensuring research integrity through comprehensive validation of literature and revision of academic documents."
                },
                {
                title: "VeriDraft: An Intelligent Assistant for Validating Sources and Revising Drafts",
                link: "https://example.com/veridraft",
                summary: "VeriDraft is a smart platform that helps researchers validate literature sources and refine their document drafts."
                },
                {
                title: "Literature Review and Document Refinement: Ensuring Accuracy and Relevance",
                link: "https://example.com/literature-review",
                summary: "This article discusses techniques for validating sources and revising documents to enhance research quality."
                },
                {
                title: "Improving Research Quality: Literature Validation and Document Revision Techniques",
                link: "https://example.com/research-quality",
                summary: "An in-depth look at methods for ensuring research integrity through comprehensive validation of literature and revision of academic documents."
                },
                {
                title: "VeriDraft: An Intelligent Assistant for Validating Sources and Revising Drafts",
                link: "https://example.com/veridraft",
                summary: "VeriDraft is a smart platform that helps researchers validate literature sources and refine their document drafts."
                },
                {
                    title: "VeriDraft: An Intelligent Assistant for Validating Sources and Revising Drafts",
                    link: "https://example.com/veridraft",
                    summary: "VeriDraft is a smart platform that helps researchers validate literature sources and refine their document drafts."
                },
            ].slice(0, resultCount);
            setSearchResults(results);
        }, 2000); // Simulate 2 seconds loading time
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const LiteratureItem = ({ title, link, summary }) => (
        <div className="mb-8">
            <h3 className="text-2xl font-bold text-yellow-fig hover:text-gray-2">
                <a href={link} target="_blank" rel="noopener noreferrer">{title}</a>
            </h3>
            <p className="text-green-500 text-sm mb-1 hover:underline">
                <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
            </p>
            <p className="text-gray-2">{summary}</p>
        </div>
    );
        
    const LiteratureResults = ({ results }) => (
        <div className="mt-12 px-4 w-full">
            {results.map((item, index) => (
                <LiteratureItem key={index} {...item} />
            ))}
        </div>
    );

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
                    <select
                        value={resultCount}
                        onChange={handleResultCountChange}
                        className="px-2 py-1 md:px-3 md:py-2 border border-gray-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-fig text-sm md:text-base"
                        disabled={isLoading}
                    >
                        {[...Array(10)].map((_, i) => (
                            <option key={i+1} value={i+1}>
                                {i+1}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
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