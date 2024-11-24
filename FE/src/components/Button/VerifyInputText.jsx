import React, { useState, useRef, useEffect } from 'react';
import upload_icon from '../../assets/icons/upload.svg'
import BoldText from '../Text/BoldText';


function VerifyInputText() {
    const a = {
      "status": 200,
      "data": {
        "summary": "Here is a summary of the suggestions for improvement for each page:\n\n**Page 1**\n\n* The title could be more specific and descriptive.\n* The author profiles are standard and do not require changes.\n* The sentence \"All content following this page was uploaded by Yuyun Wabula on 09 June 2023.\" is unclear and could be rephrased.\n* The sentence \"The user has requested enhancement of the downloaded file.\" is unclear and could be rephrased.\n\n**Page 2**\n\n* The introduction could be more concise and focused on the main research question.\n* The related work section could be more organized and focused on the specific research question.\n* The transition between sections could be smoother.\n* The writing could be more concise and focused on the main research question.\n\n**Page 3**\n\n* The introduction could be improved by providing a clearer overview of the research and its significance.\n* The methodology section could be improved by providing a clearer explanation of the data collection and preprocessing techniques used.\n* The results section could be improved by providing a clearer summary of the findings and how they relate to the research question.\n\n**Page 4**\n\n* The introduction could be more concise and clear.\n* The proposed annotation approach could be more specific and clear.\n* The CNN algorithm could be more clearly explained.\n* The experimental setup could be more concise and clear.\n\n**Page 5**\n\n* The introduction could be more concise and focused.\n* The discussion section could be more concise and varied.\n* The tables and figures could be more clearly labeled and explained.\n* The study could benefit from more visual aids.\n\n**Page 6**\n\n* The conclusion could be more explicit about the implications of the results.\n* The transition between the two paragraphs could be smoother.\n\nOverall, the writing is clear and concise, but there are some minor areas for improvement in terms of sentence structure and clarity.",
        "suggestions": [
          {
            "page_id": 0,
            "suggestions": "Here are the suggestions for improvement:\n\n1. The title \"Text Preprocessing Approaches in CNN for Disaster Reports Dataset\" is clear and concise, but it could be more specific and descriptive. For example, \"A Comparative Study of Text Preprocessing Techniques for Disaster Reports Classification using Convolutional Neural Networks\".\n\n2. The DOI and CITATIONS sections are standard and do not require changes.\n\n3. The author profiles are standard and do not require changes.\n\n4. The sentence \"All content following this page was uploaded by Yuyun Wabula on 09 June 2023.\" is unclear and could be rephrased to \"Uploaded by Yuyun Wabula on 09 June 2023.\"\n\n5. The sentence \"The user has requested enhancement of the downloaded file.\" is unclear and could be rephrased to \"Enhanced version available for download.\"\n\nHere is the rewritten version:\n\nSee discussions, stats, and author profiles for this publication at: https://www.researchgate.net/publication/369496471\n\nA Comparative Study of Text Preprocessing Techniques for Disaster Reports Classification using Convolutional Neural Networks\nConference Paper · February 2023\nDOI: 10.1109/ICAIIC57133.2023.10067109\nCITATIONS\n2\nREADS\n60\n3 authors, including:\nHazriani Zainuddin\nHandayani University, Indonesia\n33 PUBLICATIONS   97 CITATIONS   \nSEE PROFILE\nYuyun Wabula\nNational Research and Innovatioan Agency\n41 PUBLICATIONS   120 CITATIONS   \nSEE PROFILE\nUploaded by Yuyun Wabula on 09 June 2023.\nEnhanced version available for download."
          },
          {
            "page_id": 1,
            "suggestions": "Here are the suggestions for improvement:\n\n**Clarity**\n\n* Section I, Introduction: The first sentence is unclear. It would be better to rephrase it to \"Disaster reporting systems play a crucial role in emergency response efforts, and text-based reports are a common format used to collect data.\"\n* Section I, Introduction: The sentence \"Data collection techniques by volunteers from interviews, documentation, and field observations written in the form of report documents [1] are time-consuming and more expensive.\" is unclear. It would be better to rephrase it to \"Collecting data through volunteer interviews, documentation, and field observations can be time-consuming and costly.\"\n* Section I, Introduction: The sentence \"Working with unstructured data will burden the stakeholders in making a quick decision.\" is unclear. It would be better to rephrase it to \"Unstructured data can hinder stakeholders' ability to make timely decisions.\"\n\n**Grammar and Style**\n\n* Section I, Introduction: The sentence \"Studies at the big data scale allow changes to the way documents are analyzed.\" is a sentence fragment. It would be better to rephrase it to \"Studies at the big data scale have led to changes in how documents are analyzed.\"\n* Section I, Introduction: The sentence \"Generally by applying machine learning techniques and natural language processing (NLP).\" is a sentence fragment. It would be better to rephrase it to \"Machine learning techniques and natural language processing (NLP) are commonly used to analyze documents.\"\n* Section II, Related Work: The sentence \"For example, research conducted by [8] identifying types of information during a disaster.\" is unclear. It would be better to rephrase it to \"For instance, [8] conducted a study on identifying types of information during a disaster.\"\n\n**Structure and Organization**\n\n* The introduction could be more concise and focused on the main research question.\n* The related work section could be more organized and focused on the specific research question.\n* The transition between sections could be smoother.\n\n**Conciseness**\n\n* Section I, Introduction: The sentence \"Data collection techniques by volunteers from interviews, documentation, and field observations written in the form of report documents [1] are time-consuming and more expensive.\" is redundant. It would be better to remove the sentence and focus on the main point.\n* Section I, Introduction: The sentence \"Working with unstructured data will burden the stakeholders in making a quick decision.\" is redundant. It would be better to remove the sentence and focus on the main point.\n\n**Engagement**\n\n* The introduction could be more engaging by providing a real-life example or scenario.\n* The related work section could be more engaging by highlighting the significance of the research and its potential impact.\n* The writing could be more concise and focused on the main research question.\n\nHere are some specific suggestions for improvement:\n\n* Consider adding a brief overview of the research question and its significance in the introduction.\n* Consider adding a table or figure to summarize the related work section.\n* Consider using a more formal tone throughout the document.\n* Consider adding a conclusion section to summarize the main findings and implications of the research.\n\nHere are some rewritten versions of specific sections:\n\n**Introduction**\n\nDisaster reporting systems play a crucial role in emergency response efforts, and text-based reports are a common format used to collect data. However, collecting data through volunteer interviews, documentation, and field observations can be time-consuming and costly. To address this issue, researchers have turned to machine learning techniques and natural language processing (NLP) to analyze documents.\n\n**Related Work**\n\nSeveral studies have explored the use of machine learning and NLP to analyze disaster-related data. For instance, [8] conducted a study on identifying types of information during a disaster, and [20] developed automated machine learning models to detect disaster-related information in user posting text. These studies demonstrate the potential of machine learning and NLP in analyzing disaster-related data.\n\n**Conclusion**\n\nIn conclusion, this study aimed to compare the performance of automatic and semi-automatic text preprocessing techniques in the CNN algorithm for disaster reports dataset. The results show that the semi-automatic text preprocessing approach outperformed the automatic approach in terms of accuracy. The proposed model has the potential to improve the accuracy of disaster-related data analysis. Future studies could explore the application of this model in real-world disaster response scenarios."
          },
          {
            "page_id": 2,
            "suggestions": "Here are the suggestions for improvement:\n\n**Clarity**\n\n* Section III.A: The sentence \"The dataset in this study is sourced from online news sites, especially the new title that contain disaster information (in Indonesian language).\" is unclear. It would be better to specify what kind of disaster information is being referred to (e.g. natural disasters, man-made disasters, etc.).\n* Section III.B.1: The example provided for tokenization is unclear. It would be better to provide a clear explanation of what tokenization is and how it is applied to the text.\n\n**Grammar and Style**\n\n* Section I: The sentence \"Research by [20] using eyewitness information sources on social media by perfecting linguistic grammar rules to extract features of disaster text.\" is unclear. It would be better to rephrase it to something like \"Research by [20] used eyewitness information sources on social media to extract features of disaster text by perfecting linguistic grammar rules.\"\n* Section III.B.2: The sentence \"Case folding: namely changing text to lowercase in the following example.\" is unclear. It would be better to rephrase it to something like \"Case folding involves converting text to lowercase, as shown in the following example.\"\n* Section III.B.3: The sentence \"Filtering/ Stop Word removal: is the process of selecting data by removing unnecessary words such as connecting words between sentences, punctuation marks, prepositions and symbols in the following example\" is unclear. It would be better to rephrase it to something like \"Filtering/Stop Word removal involves removing unnecessary words, such as connecting words, punctuation marks, prepositions, and symbols, as shown in the following example.\"\n\n**Structure and Organization**\n\n* The introduction could be improved by providing a clearer overview of the research and its significance.\n* The methodology section could be improved by providing a clearer explanation of the data collection and preprocessing techniques used.\n* The results section could be improved by providing a clearer summary of the findings and how they relate to the research question.\n\n**Conciseness**\n\n* Section I: The sentence \"In the first trial, adopting manual classification produced an F-Score of 0.81. Then the model was improvised with the LR-TED approach, and produced an F-score of 0.93.\" could be condensed to something like \"The model achieved an F-Score of 0.81 using manual classification, which improved to 0.93 with the LR-TED approach.\"\n* Section III.B: The examples provided for tokenization, case folding, and filtering/stop word removal could be condensed to provide a clearer explanation of the techniques.\n\n**Engagement**\n\n* The introduction could be improved by providing a more engaging and concise overview of the research and its significance.\n* The results section could be improved by providing a clearer summary of the findings and how they relate to the research question.\n* The conclusion could be improved by providing a more engaging and concise summary of the research and its implications."
          },
          {
            "page_id": 3,
            "suggestions": "Here are the suggestions for improvement:\n\n**Section 1: Introduction**\n\n* Classification of labels is divided into 3 classes, namely the National Search and Rescue Agency (Basarnas), Regional Disaster Management Agency (BPBD), and Fire Department (Damkar). The purpose of classifying this label is to facilitate coordination in reporting disaster information.\n\n* Suggestion: Consider rephrasing the sentence to make it more concise and clear. For example:\n\n\"The labels are categorized into three classes: National Search and Rescue Agency (Basarnas), Regional Disaster Management Agency (BPBD), and Fire Department (Damkar). The primary goal is to facilitate coordination in reporting disaster information.\"\n\n**Section D: Proposed Annotation Approach**\n\n* The work process is to remove words that are irrelevant to the aftermath of the disaster through an automatic preprocessing technique.\n\n* Suggestion: Consider rephrasing the sentence to make it more specific and clear. For example:\n\n\"The proposed semi-automatic preprocessing (SAP) technique removes irrelevant words related to disaster aftermath through an automatic preprocessing process.\"\n\n**Section E: Convolutional Neural Network (CNN)**\n\n* The CNN algorithm in this study is intended to classify the disaster datasets. Although this algorithm is good for classifying images, we found that many researchers have used the CNN algorithm to classify datasets that originate from text documents.\n\n* Suggestion: Consider rephrasing the sentence to make it more concise and clear. For example:\n\n\"The study employs a CNN algorithm to classify disaster datasets, leveraging its ability to process text data as well as images.\"\n\n**IV. EXPERIMENTAL SETUP**\n\n* The experiments were conducted using series combination of four hyper-parameters on CNN, namely learning rate, bath size, epochs and Random State.\n\n* Suggestion: Consider rephrasing the sentence to make it more concise and clear. For example:\n\n\"The experiment involves a combination of four hyperparameters on CNN: learning rate, batch size, epochs, and random state.\"\n\n**Tables II and III**\n\n* Suggestion: Consider adding brief explanations or footnotes to the tables to provide clarity on the abbreviations and data. For example:\n\n\"Abbreviations: DS = dataset size, TRD = training dataset size, TSD = testing dataset size, LR = learning rate, EP = epoch, BS = batch size, RS = random state, Acc = accuracy, Loss = loss value\"\n\nOverall, the writing is clear and concise, but there are some minor areas for improvement in terms of sentence structure and clarity."
          },
          {
            "page_id": 4,
            "suggestions": "Here are the suggestions for improvement:\n\n**Clarity:**\n\n* In the introduction, it's unclear what the study is comparing. Consider rephrasing to make it clear that the study is comparing the performance of automatic and semi-automatic preprocessing techniques.\n* In the discussion section, it's unclear what the study's proposed algorithm (SAP) is and how it works. Consider adding a brief explanation or diagram to help clarify the process.\n\n**Grammar and Style:**\n\n* In the introduction, the sentence \"The study in [30] proposes 2 algorithms namely CRF and LSTM, the automatic preprocessing technique i.e. tokenization is used with accuracy reaches 0.98.\" is awkwardly phrased. Consider rephrasing to make it clearer and more concise.\n* In the discussion section, the sentence \"The comparison results produce an accuracy of 89.01; 89.01; 93.82; 91.28.\" is unclear. Consider rephrasing to make it clearer what the results are comparing.\n\n**Structure and Organization:**\n\n* The introduction could be more concise and focused. Consider breaking it up into smaller paragraphs to make it easier to follow.\n* The discussion section jumps abruptly from discussing previous studies to presenting the results of the current study. Consider adding a transition sentence or paragraph to connect the two sections.\n\n**Conciseness:**\n\n* The discussion section includes a lot of repetitive language (e.g. \"The accuracy obtained reaches...\"). Consider rephrasing to make it more concise and varied.\n* The tables and figures could be more clearly labeled and explained. Consider adding captions or footnotes to help readers understand what they are looking at.\n\n**Engagement:**\n\n* The study could benefit from a clearer explanation of the importance and relevance of the topic. Consider adding a brief introduction to explain why automatic and semi-automatic preprocessing techniques are important in the field of disaster reporting.\n* The study could benefit from more visual aids (e.g. diagrams, flowcharts) to help illustrate the process and results. Consider adding more visual aids to make the study more engaging and easier to follow.\n\nSpecific suggestions:\n\n* In the introduction, consider rephrasing the sentence \"The study in [30] proposes 2 algorithms namely CRF and LSTM, the automatic preprocessing technique i.e. tokenization is used with accuracy reaches 0.98.\" to something like \"Previous studies have shown that automatic preprocessing techniques, such as tokenization, can achieve high accuracy rates (e.g. 0.98 in [30]).\"\n* In the discussion section, consider rephrasing the sentence \"The comparison results produce an accuracy of 89.01; 89.01; 93.82; 91.28.\" to something like \"The results of the comparison show that the proposed algorithm achieved an accuracy rate of 89.01%, 89.01%, 93.82%, and 91.28% respectively.\"\n* In the discussion section, consider adding a sentence or paragraph to connect the previous studies to the current study, such as \"Building on the work of previous studies, our study proposes a semi-automatic preprocessing technique that eliminates irrelevant words in the disaster reports dataset.\"\n* In the tables and figures, consider adding captions or footnotes to explain what each column or row represents."
          },
          {
            "page_id": 5,
            "suggestions": "Here is the feedback for the document:\n\n**VI. CONCLUSION**\n\n* The conclusion is concise and summarizes the main findings, but it could be more explicit about the implications of the results. Consider adding a sentence or two to clarify the significance of the improved accuracy.\n* The transition between the two paragraphs could be smoother. Consider adding a sentence or two to link the two paragraphs together.\n\nRewritten version:\n\nBased on our experiment results on 200 disaster dataset records using the automatic preprocessing technique, the average accuracy was 0.81, which improved to 0.95 using the semi-automatic preprocessing technique. The proposed model showed convergence on epoch 20 with 80:20 training data and 90:10 data requires epoch 20-30. These results suggest that our proposed approach of cleaning the dataset with the semi-automatic preprocessing model can significantly improve accuracy compared to the previous model. Furthermore, these findings have important implications for disaster management, highlighting the potential benefits of adopting this approach.\n\n**ACKNOWLEDGMENT**\n\n* The acknowledgment section is brief and mentions the funding source, but it could be more explicit about the role of the funding agency.\n* Consider adding a sentence or two to acknowledge the contributions of the authors.\n\nRewritten version:\n\nThis work is supported by the Indonesian government through the National Competitive Research Grants, organized by the National Research and Innovation Agency “BRIN”. We would like to acknowledge the essential role of the BRIN in providing the necessary funding for this project. Additionally, we would like to thank our colleagues and collaborators who have contributed to this research.\n\n**REFERENCES**\n\n* The reference list is extensive, but it could be formatted more consistently. Consider using a consistent citation style throughout the document.\n* Some references are not properly cited, and the formatting is inconsistent. Make sure to check each reference to ensure it is properly formatted and cited.\n\nNote: I did not suggest any changes to the reference list as it appears to be a compilation of relevant research papers. However, I did note that the formatting is not consistent and some references are not properly cited, suggesting that the author or editor may need to review the reference list further."
          }
        ]
      }
    };
    
    // const [summary, setSummary] = useState("Here is a summary of the suggestions for improvement for each page:\n\n**Page 1**\n\n* The title could be more specific and descriptive.\n* The author profiles are standard and do not require changes.\n* The sentence \"All content following this page was uploaded by Yuyun Wabula on 09 June 2023.\" is unclear and could be rephrased.\n* The sentence \"The user has requested enhancement of the downloaded file.\" is unclear and could be rephrased.\n\n**Page 2**\n\n* The introduction could be more concise and focused on the main research question.\n* The related work section could be more organized and focused on the specific research question.\n* The transition between sections could be smoother.\n* The writing could be more concise and focused on the main research question.\n\n**Page 3**\n\n* The introduction could be improved by providing a clearer overview of the research and its significance.\n* The methodology section could be improved by providing a clearer explanation of the data collection and preprocessing techniques used.\n* The results section could be improved by providing a clearer summary of the findings and how they relate to the research question.\n\n**Page 4**\n\n* The introduction could be more concise and clear.\n* The proposed annotation approach could be more specific and clear.\n* The CNN algorithm could be more clearly explained.\n* The experimental setup could be more concise and clear.\n\n**Page 5**\n\n* The introduction could be more concise and focused.\n* The discussion section could be more concise and varied.\n* The tables and figures could be more clearly labeled and explained.\n* The study could benefit from more visual aids.\n\n**Page 6**\n\n* The conclusion could be more explicit about the implications of the results.\n* The transition between the two paragraphs could be smoother.\n\nOverall, the writing is clear and concise, but there are some minor areas for improvement in terms of sentence structure and clarity.");
    const [summary, setSummary] = useState(a.data.summary);
    const [suggestions, setSuggestions] = useState(a.data.suggestions);

    const [isLoading, setIsLoading] = useState(false);

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
  
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleVerify();
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
  
    const handleVerify = () => {
      if (isUploaded) {
        // Implement your verification logic here
        setIsVerified(true);
        alert('File verified successfully!');
      } else {
        alert('Please upload a file before verifying.');
      }
    };
  
    return (
      <>
        <div className="flex flex-col items-center w-full mb-10">
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
              text.trim().length !== 0
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isUploaded}
          >
            Verify
          </button>
        </div>

        {isLoading && (
          <div className="mt-12 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-fig"></div>
          </div>
        )}

        {!isLoading && (
          <>
            <div className='mb-10'>
              <p className='text-yellow-fig text-xl font-bold mb-5'>General Summary</p>
              <div className='bg-white whitespace-pre-wrap p-5 rounded-3xl'>
                  <BoldText text={summary} />
              </div>
            </div>

            <p className='text-yellow-fig text-xl font-bold mb-5'>Suggestions</p>

            {suggestions.map((item, index) => (
              <div key={index} className='mb-10'>
                <p className='text-yellow-fig text-xl font-bold mb-5'>Page {item.page_id + 1}</p>
                <div className='bg-white whitespace-pre-wrap p-5 rounded-3xl'>
                  <BoldText text={item.suggestions} />
                </div>
              </div>  
            ))};
          </>
        )}
      </>
    );
}

export default VerifyInputText;