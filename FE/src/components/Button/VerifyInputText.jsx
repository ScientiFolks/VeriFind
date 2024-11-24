import { useState, useRef, useEffect } from 'react';
import upload_icon from '../../assets/icons/upload.svg'
import BoldText from '../Text/BoldText';
import SuggestionsPagination from '../Pagination/SuggestionsPagination';
import { verifyDocument, verifyStatement } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function VerifyInputText() {
    // Validation input
    const [statement, setStatement] = useState('');
    const [pdfFile, setPdfFile] = useState(null);

    // Validation output
    const [summary, setSummary] = useState("");
    const [suggestions, setSuggestions] = useState("");

    // UI State
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    
    // Ref
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
  
    // File Maximum size
    const MAX_FILE_SIZE = 10 * 1024 * 1024;
    // Statement Maximum Character
    const MAX_STATEMENT_CHAR = 4500;


    // Handle Text Area
    useEffect(() => {
      adjustTextareaHeight();
    }, [statement]);

    const adjustTextareaHeight = () => {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleTextChange = (e) => {
      if (!isUploaded) {
        setStatement(e.target.value);
      }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (statement.trim().length !== 0) {
              handleVerify();
            }
        }
    };

    // Handle file upload
    const handleUploadClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];

      if (file && file.type === 'application/pdf') {
        if (file.size > MAX_FILE_SIZE) {
          toast.error('File size exceeds 10MB. Please select a smaller file.', {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        else {
          setPdfFile(file);
          setStatement(file.name);
          setIsUploaded(true);
        }
      }
    };
  
    const handleCancelUpload = () => {
      setPdfFile(null);
      setStatement('');
      setIsUploaded(false);
      fileInputRef.current.value = '';
    };

    const handleVerify = () => {
      if (statement.length > MAX_STATEMENT_CHAR) {
        toast.error(`Maximum statement size exceeds ${MAX_STATEMENT_CHAR} characters. Please reduce your statement size`, {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else {
        setIsLoading(true);
        
        if (pdfFile) {
          verifyDocument(pdfFile).then(result => {
            console.log("Response:", result);
            setSummary(result.data.summary);
            setSuggestions(result.data.suggestions);
          })
          .catch(error => {
            console.error("Error:", error);
            toast.error('Error', {
              position: "top-center",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
        }
        else {
          verifyStatement(statement).then(result => {
            setIsLoading(false);
            console.log("Response:", result);
            setSummary(result.data);
          })
          .catch(error => {
            console.error("Error:", error);
            toast.error('Error', {
              position: "top-center",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
        }
      }
    };
  
    const toggleSuggestions = () => {
      setShowSuggestions(!showSuggestions);
    };

    return (
      <>
        <ToastContainer />
        <div className="flex flex-col items-center w-full mb-10">
          <div className="flex justify-center items-center gap-6 w-full mb-5">
            <textarea
              ref={textareaRef}
              value={statement}
              rows={1}
              onChange={handleTextChange}
              className={`min-h-[40px] w-10/12 p-4 border border-gray-300 rounded-3xl resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-yellow-fig ${
                isUploaded ? 'bg-gray-100' : ''
              }`}
              placeholder="Type your statements..."
              readOnly={isUploaded}
              onKeyDown={handleKeyPress}
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
            onClick={handleVerify}
            className={`mt-2 p-2 rounded-3xl min-w-44 w-72 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              statement.trim().length !== 0
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Verify
          </button>
        </div>

        {isLoading && (
          <div className="mt-12 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-fig"></div>
          </div>
        )}

        {(!isLoading && summary !== "") && (
          <>
            <div className='mb-10'>
              <p className='text-yellow-fig text-xl font-bold mb-5'>General Summary</p>
              <div className='bg-white whitespace-pre-wrap p-5 rounded-3xl'>
                  <BoldText text={summary} />
              </div>
            </div>

            {suggestions.length !== 0 && 
              <>
                <button 
                  className='text-yellow-fig hover:text-gradient-3 text-xl font-bold mb-5'
                  onClick={toggleSuggestions}
                >
                  {showSuggestions ? 'Hide Suggestions' : 'Show Suggestions'}
                </button>
                <SuggestionsPagination suggestions={suggestions} showSuggestions={showSuggestions} />
              </>
            }
          </>
        )}
      </>
    );
}

export default VerifyInputText;