import React, { useState } from 'react';
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function LiteratureDetail({ literature, onBack }) {
    const [wordMeanings, setWordMeanings] = useState({});
    const [isLoadingWord, setIsLoadingWord] = useState(false);
    const [selectedWord, setSelectedWord] = useState(null);
    const [currentMeaningIndex, setCurrentMeaningIndex] = useState(0);

    // Replace with actual api call
    // Dummy keywords & detailed summarize for demonstration
    const keywords = ['Machine Learning', 'Data', 'Research', 'Academic'];
    const detailed_summary = "This is a detailed summary of the literature. It should be a long text that describes the literature in detail. This is a detailed summary of the literature. It should be a long text that describes the literature in detail. This is a detailed summary of the literature. It should be a long text that describes the literature in detail. This is a detailed summary of the literature. It should be a long text that describes the literature in detail. This is a detailed summary of the literature. It should be a long text that describes the literature in detail. This is a detailed summary of the literature. It should be a long text that describes the literature in detail. This is a detailed summary of the literature. It should be a long text that describes the literature in detail. This is a detailed summary of the literature. It should be a long text that describes the literature in detail.";

    const handleWordClick = async (word) => {
        if (selectedWord === word) {
            setSelectedWord(null);
            return;
        }

        setIsLoadingWord(true);
        setSelectedWord(word);
        setCurrentMeaningIndex(0);

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.toLowerCase())}`);
            const data = await response.json();
            
            if (response.ok && data && data[0]?.meanings) {
                setWordMeanings(prev => ({
                    ...prev,
                    [word]: data[0].meanings
                }));
            } else {
                setWordMeanings(prev => ({
                    ...prev,
                    [word]: [{
                        partOfSpeech: "unknown",
                        definitions: [{ definition: 'No definition found' }]
                    }]
                }));
            }
        } catch (error) {
            console.error('Error fetching word meaning:', error);
            setWordMeanings(prev => ({
                ...prev,
                [word]: [{
                    partOfSpeech: "error",
                    definitions: [{ definition: 'No definition found' }]
                }]
            }));
        } finally {
            setIsLoadingWord(false);
        }
    };

    const handleNextMeaning = (e) => {
        e.stopPropagation();
        if (selectedWord && wordMeanings[selectedWord]) {
            setCurrentMeaningIndex((prev) => 
                prev < wordMeanings[selectedWord].length - 1 ? prev + 1 : prev
            );
        }
    };

    const handlePrevMeaning = (e) => {
        e.stopPropagation();
        if (selectedWord && wordMeanings[selectedWord]) {
            setCurrentMeaningIndex((prev) => prev > 0 ? prev - 1 : prev);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <button 
                onClick={onBack}
                className="flex items-center text-yellow-fig hover:text-gray-2 transition-colors duration-300 mb-6"
            >
                <FaArrowLeft className="mr-2" />
                Back to results
            </button>
            
            <h1 className="text-2xl md:text-3xl font-bold text-yellow-fig mb-4">
                {literature.title}
            </h1>
            
            <a 
                href={literature.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-500 text-sm md:text-base hover:underline mb-6 block"
            >
                {literature.url}
            </a>
            
            <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-2 mb-3">Keywords</h2>
                <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                        <div key={index} className="relative">
                            <span 
                                className={`px-3 py-2 rounded-full text-sm cursor-pointer transition-colors duration-300 ${
                                    selectedWord === keyword 
                                        ? 'bg-yellow-fig text-white' 
                                        : 'bg-gray-1 text-gray-2 hover:bg-yellow-fig hover:text-white'
                                }`}
                                onClick={() => handleWordClick(keyword)}
                            >
                                {keyword}
                            </span>
                            {selectedWord === keyword && wordMeanings[keyword] && (
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-4 bg-gray-1 text-white text-sm rounded-lg w-64 z-10">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="italic">{wordMeanings[keyword][currentMeaningIndex].partOfSpeech}</span>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={handlePrevMeaning}
                                                className={`p-1 rounded ${currentMeaningIndex === 0 ? 'text-gray-400' : 'hover:text-yellow-fig'}`}
                                                disabled={currentMeaningIndex === 0}
                                            >
                                                <FaChevronLeft size={14} />
                                            </button>
                                            <span>{currentMeaningIndex + 1}/{wordMeanings[keyword].length}</span>
                                            <button 
                                                onClick={handleNextMeaning}
                                                className={`p-1 rounded ${currentMeaningIndex === wordMeanings[keyword].length - 1 ? 'text-gray-400' : 'hover:text-yellow-fig'}`}
                                                disabled={currentMeaningIndex === wordMeanings[keyword].length - 1}
                                            >
                                                <FaChevronRight size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-center">
                                        {wordMeanings[keyword][currentMeaningIndex].definitions[0].definition}
                                    </p>
                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-800"></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            
            <div>
                <h2 className="text-xl font-bold text-gray-2 mb-3">Detailed Summary</h2>
                <p className="text-gray-2 text-sm md:text-base leading-relaxed text-justify">
                    {detailed_summary}
                </p>
            </div>

            {isLoadingWord && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-fig"></div>
                </div>
            )}
        </div>
    );
}

export default LiteratureDetail;