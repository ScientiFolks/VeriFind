import React, { useState } from 'react';
import BoldText from '../Text/BoldText';


function SuggestionsPagination({ suggestions, showSuggestions }) {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
  };

  if (!showSuggestions || suggestions.length === 0) {
    return null;
  }

  const currentItem = suggestions[currentPage];

  return (
    <div className='mb-10'>
      <p className='text-yellow-fig text-xl font-bold mb-5'>Page {currentItem.page_id + 1}</p>
      <div className='bg-white whitespace-pre-wrap p-5 rounded-3xl'>
        <BoldText text={currentItem.suggestions} />
      </div>
      <div className='mt-5 flex justify-between'>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className='bg-blue-500 text-white px-4 py-2 rounded-3xl disabled:bg-gray-300'
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === suggestions.length - 1}
          className='bg-blue-500 text-white px-4 py-2 rounded-3xl disabled:bg-gray-300'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SuggestionsPagination;