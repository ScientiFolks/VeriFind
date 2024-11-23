import React, { useState } from 'react';

const ToggleButton = ({ onToggle }) => {
  const [activeOption, setActiveOption] = useState('Find');

  const handleToggle = (option) => {
    setActiveOption(option);
    onToggle(option);
  };

  return (
    <div className="inline-flex p-0.5 sm:p-1 rounded-full bg-transparent outline outline-2 outline-gray-300 gap-1 sm:gap-2">
      <button
        className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full transition-all duration-300 font-bold text-sm sm:text-xl ${
          activeOption === 'Find'
            ? 'bg-yellow-fig text-black-fig'
            : 'bg-transparent text-yellow-fig hover:bg-gray-200'
        }`}
        onClick={() => handleToggle('Find')}
      >
        Find
      </button>
      <button
        className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full transition-all duration-300 font-bold text-sm sm:text-xl ${
          activeOption === 'Verify'
            ? 'bg-yellow-fig text-black-fig'
            : 'bg-transparent text-yellow-fig hover:bg-gray-200'
        }`}
        onClick={() => handleToggle('Verify')}
      >
        Verify
      </button>
    </div>
  );
};

export default ToggleButton;