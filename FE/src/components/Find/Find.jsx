import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Find() {
    const [searchText, setSearchText] = useState('');
    const [resultCount, setResultCount] = useState(5);
    const [isSubmitted, setIsSubmitted] = useState(false);

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

        // Handle search query to backend
        console.log('Searching for:', searchText);
        console.log('Show total results:', resultCount);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
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
                        className="w-full px-4 py-2 pl-10 pr-4 rounded-xl border border-gray-2 focus:outline-none focus:ring-2 focus:ring-yellow-fig resize-none overflow-hidden"
                        rows="1"
                        style={{ minHeight: '40px' }}
                    />
                    <FaSearch 
                        className="absolute left-3 top-3 text-gray-1 cursor-pointer" 
                        onClick={handleSubmit}
                    />
                </div>
                <div className={`flex justify-end items-center transition-all duration-300 ${isSubmitted ? 'md:mr-4' : 'w-full mt-2 md:mt-4 max-w-2xl'}`}>
                    <span className="mr-2 text-gray-2 text-sm md:text-base">Show total results:</span>
                    <select
                        value={resultCount}
                        onChange={handleResultCountChange}
                        className="px-2 py-1 md:px-3 md:py-2 border border-gray-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-fig text-sm md:text-base"
                    >
                        {[...Array(10)].map((_, i) => (
                            <option key={i+1} value={i+1}>
                                {i+1}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Find;