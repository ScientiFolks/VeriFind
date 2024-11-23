import React, { useState, useRef, useEffect } from 'react';
import upload_icon from '../../assets/icons/upload.svg'


function VerifyInputText() {
    const [text, setText] = useState('');
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
  
    useEffect(() => {
      adjustTextareaHeight();
    }, [text]);
  
    const adjustTextareaHeight = () => {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };
  
    const handleTextChange = (e) => {
      if (!isUploaded) {
        setText(e.target.value);
      }
    };
  
    const handleUploadClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file && file.type === 'application/pdf') {
        setFileName(file.name);
        setText(file.name);
        setIsUploaded(true);
        setIsVerified(false);
      } else {
        alert('Please select a PDF file.');
        setFileName('');
      }
    };
  
    const handleCancelUpload = () => {
      setFileName('');
      setText('');
      setIsUploaded(false);
      setIsVerified(false);
      fileInputRef.current.value = '';
    };
  
    const handleVerify = (e) => {
        e.preventDefault();
      if (isUploaded) {
        // Implement your verification logic here
        setIsVerified(true);
        alert('File verified successfully!');
      } else {
        alert('Please upload a file before verifying.');
      }
    };
  
    return (
      <form className="flex flex-col items-center w-full" onSubmit={handleVerify}>
        <div className="flex justify-center items-center gap-6 w-full mb-5">
          <textarea
            ref={textareaRef}
            value={text}
            rows={1}
            onChange={handleTextChange}
            className={`min-h-[40px] w-10/12 p-4 border border-gray-300 rounded-3xl resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-yellow-fig ${
              isUploaded ? 'bg-gray-100' : ''
            }`}
            placeholder="Type your statements..."
            readOnly={isUploaded}
          />
          
          {!isUploaded ? (
            <button
              onClick={handleUploadClick}
              type='button'
              className="p-3 flex justify-center bg-gray-100 rounded-2xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Upload PDF"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns={upload_icon}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleCancelUpload}
              type='button'
              className="p-3 flex justify-center bg-red-100 rounded-2xl hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
              title="Cancel Upload"
            >
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf"
            className="hidden"
          />
        </div>
        <button
          className={`mt-2 p-2 rounded-3xl min-w-44 w-72 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            text.trim().length !== 0
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!isUploaded}
        >
          Verify
        </button>
      </form>
    );
}

export default VerifyInputText;