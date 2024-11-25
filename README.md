# VeriFind

![alt text](./Images/logo.png)

A repository for VeriFind App
A React-based web application that enables users to search academic literature and validate research documents with ease.

```bash
VeriFind
├─ AI
│  ├─ configs
│  │  ├─ search.py
│  │  └─ __init__.py
│  ├─ models
│  │  ├─ content_extraction.py
│  │  ├─ revision.py
│  │  ├─ search.py
│  │  ├─ summarize_agent.py
│  │  ├─ validation.py
│  │  ├─ validation2.py
│  │  └─ __init__.py
│  ├─ routes
│  │  ├─ extraction.py
│  │  ├─ revision.py
│  │  ├─ search.py
│  │  ├─ validation.py
│  │  ├─ __init__.py
│  ├─ services
│  │  ├─ extraction.py
│  │  ├─ revision.py
│  │  ├─ search.py
│  │  ├─ validation.py
│  │  └─ __init__.py
│  ├─ requirements.txt
│  └─ main.py
│
├─ FE
│  ├─ public
│  │  └─ VeriFind.ico
│  ├─ src
│  │  ├─ assets
│  │  │  ├─ fonts
│  │  │  │  ├─ AnonymousPro-Bold.ttf
│  │  │  │  └─ AnonymousPro-Regular.ttf
│  │  │  └─ icons
│  │  │     └─ upload.svg
│  │  ├─ components
│  │  │  ├─ Button
│  │  │  │  ├─ ToggleButton.jsx
│  │  │  │  └─ VerifyInputText.jsx
│  │  │  ├─ Find
│  │  │  │  └─ Find.jsx
│  │  │  ├─ Pagination
│  │  │  │  └─ SuggestionsPagination.jsx
│  │  │  ├─ Text
│  │  │  │  └─ BoldText.jsx
│  │  │  └─ Verify
│  │  │     └─ Verify.jsx
│  │  ├─ services
│  │  │  └─ api.js
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  └─ App.jsx
│  ├─ index.html
│  ├─ vite.config.js
│  ├─ package.json
│  ├─ package-lock.json
│  ├─ eslint.config.js
│  ├─ postcss.config.js
│  ├─ tailwind.config.js
│  └─ README.md
|
├─ searxng_docker
│  ├─ .gitignore
│  ├─ docker-compose.yml
│  └─ README.md
│
├─ README.md
└─ LICENSE

```

## Project Description

Project VeriFind is a web application that enables users to search academic literature and validate research documents with ease. The application provides advanced search functionality with customizable result counts, real-time search with loading states, paginated results, and a responsive search interface. Users can upload PDF documents for validation, view a general summary of the document analysis, and receive page-by-page suggestions for improvement. The application also includes a warning system for large result sets and a statement validation feature. VeriFind is built using React, FastAPI, LangChain, and Groq.

## How It Works

VeriFind leverages a combination of modern web technologies to deliver a seamless user experience. The front end is built with React, providing a dynamic and responsive interface. TailwindCSS is used for styling, ensuring a clean and consistent design. Vite is employed as the build tool, optimizing the development process with fast build times and hot module replacement.

The back end is powered by FastAPI, which handles the application's API requests and integrates with LangChain for natural language processing tasks. Groq is utilized for querying and manipulating data, enabling efficient search and validation operations. Users can perform searches, upload documents, and receive detailed analysis results through an intuitive interface.

## Goals

The primary goals of Project VeriFind are:

1. **Enhance Research Efficiency**: Provide researchers with a powerful tool to quickly find relevant academic literature and validate their documents.
2. **Improve Document Quality**: Offer detailed analysis and suggestions for improvement to help users enhance the quality of their research documents.
3. **User-Friendly Interface**: Ensure the application is easy to use, with a responsive design and real-time feedback.
4. **Scalability and Performance**: Build a robust system capable of handling large datasets and delivering fast, accurate results.
5. **Innovation in Research Tools**: Leverage cutting-edge technologies to push the boundaries of what research validation tools can achieve.

## Features

This application has the following features:

### Literature Search

- Advanced search functionality with customizable result count (1-100)
- Real-time search with loading states
- Paginated results (10 items per page)
- Responsive search interface
- Document preview with title, link, and summary
- Comprehensive document summary review
- Warning system for large result sets

### Document Validation

- PDF document upload functionality
- Text-based input
- General summary of document analysis
- Page-by-page suggestions
- Statement validation

## Tech Stack

The application is built using the following technologies:

### Front End

- React + Vite
- TailwindCSS for styling
- React Icons
- React Toastify for notifications
- Axios for API requests

### Back End

- Fast API for back end framework
- LangChain for AI development framework
- Groq for LLM provider

## Getting Started

To get a local copy up and running follow these simple steps.

### Front End

1. Clone the repository

```bash
git clone https://github.com/ScientiFolks/VeriFind.git
```

2. Navigate to the project directory

```bash
cd VeriFind
```

3. Navigate to the frontend directory

```bash
cd FE
```

4. Install dependencies

```bash
npm install
```

5. Create `.env` file in FE directory

```
VITE_APP_API_URL=[backend-api-url]
```

6. Start development server

```bash
npm run dev
```

Or Build The Project First To Achive Maximum Performance
```bash
npm run build
```
```bash
npm run preview
```

### Back End

#### Dependencies

`cd VeriFind/AI/`
`pip install -r "requirements.txt"`

#### Running the backend

1. Navigate to the project directory

```bash
cd VeriFind
```

3. Navigate to the AI directory

```bash
cd AI
```

4. Install dependencies

```bash
pip install -r "requirements.txt"
```

5. Create `.env` file in AI directory

```bash
GROQ_API_KEY="INPUT GROQ API KEY HERE"
TAVILY_API_KEY="INPUT TAVILY API KEY HERE"
LANGCHAIN_API_KEY="INPUT LANGCHAIN API KEY HERE"
LANGCHAIN_TRACING_V2=true
```

6. Start development server

```bash
uvicorn main:app --reload --port=[port_number] --host=[server_host]
```

## API Integration

The application integrates with a backend service for those API:

- /validation/statement
- /validation/pdf
- /search/search
- /revision/statement
- /revision/pdf

## Environment Variables

- `VITE_APP_API_URL`: Backend API endpoint

Describe your submission, how it works, what are the goals.
Reasoning behind choosing framework, model, dataset, technique.
Describe findings, difficulties and limitations, and future perspectives.

## Reasoning for Choosen Tech Stack

### Front End

1. React

React is a popular JavaScript library for building user interfaces. It is known for its simplicity, flexibility, and performance. React's component-based architecture makes it easy to build complex UIs by breaking them down into smaller, reusable components. React also has a large ecosystem of libraries and tools that make it easy to integrate with other technologies, especially because familiarity.

2. TailwindCSS

TailwindCSS is a utility-first CSS framework that provides a set of pre-built utility classes for styling web applications. It allows developers to quickly build responsive and customizable UIs without writing custom CSS. TailwindCSS is highly configurable and can be easily extended to meet the specific needs of a project.

3. Vite

Vite is a modern build tool that is designed to optimize the development experience for front-end developers. It provides fast build times, hot module replacement, and a zero-config setup. Vite is particularly well-suited for React applications due to its support for JSX and TypeScript.

4. React Libraries: Icons, Toastify, and Markdown

React Icons provides a set of popular icon libraries that can be easily integrated into React applications. React Toastify is a notification library that provides customizable toast notifications for user feedback. Markdown is a lightweight markup language that is used to format text in the document, especially because of its familiarity.

### Back End

1. LangChain

LangChain is useful for building advanced AI systems that handle conversational AI, question answering, and memory-based tasks. Key benefits include:

- Versatile Tooling: It supports integrating multiple models, databases, and APIs.
- Agent Capabilities: Offers logic chains for multi-step reasoning.
- Memory Integration: Enables chat histories or contextual memory, enhancing personalized interactions.
- Developer-Friendly: Simplifies the process of building, customizing, and deploying pipelines.

LangChain is particularly effective for applications requiring modularity and scalability in handling complex AI workflows.

2. Groq

Groq is a pwerfull LLM provider. It has a simple API and can be used to generate text from a prompt. It is useful for generating text for search results, document summaries, and validation suggestions.

3. FastAPI

FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.6+ based on standard Python type hints. It is particularly useful for building APIs that require high performance and scalability.

## Findings

- Agent is so powerful that combine the superior ability of LLM and function call using tools
- There are abundance of open source API that could be combined to build a powerfull application
- There is a LLM provider that serve request in a shhort time, such as Groq

## Difficulties

- Find the most appropriate UI/UX Design in a short time
- Generate appropriate prompt for each used LLM
- Learn LangChain Framework

## Limitations

- Free Groq API has limit for request and token (llama3-8b-8192): 30 request per minute, 14,400 request per day, 30,000 tokens per minute, and 500,000 tokens per day

## Future Perspective

The plan for future development of the application includes:

- Implementing more advanced search features, such as filters and sorting options
- Enhancing the document validation process with additional analysis tools
- Integrating more AI models for improved search results and document analysis
- Adding user authentication and account management features
- Optimizing the application for performance and scalability
- Expanding the application to support multiple languages and document formats
- Collaborating with researchers and academic institutions to gather feedback and improve the application

## Use case Analysis

a. Information Extraction: Based on the input query, search for the relevant literatures along with their details

- If there are multiple results, the literatures will be paginated

b. Information Validation: Validate a literature work based on other relevant scholarly works and make suggestions on where the literature can be improved.

- The literature is reviewed page by page.
- If the source of the literature is available then validation can be executed.
- Otherwise, the user will be informed that there are no relevant literatures related to the current page.

c. Information Revision: Fix the grammar mistakes, clarity, and other aspects of writing a scholar literature.

- The literature is revised page by page.

## Feasibility

1. Development Resources: Requires a team skilled in full-stack development of front-end and back-end
2. Hardware and Infrastructure: Document validation involves heavy computations for summarization and validation.
3. Document Validation: PDF processing requires robust libraries like PDFplumber.

## Scaling

Literature search operations and summarization models can be optimized with high-performance computing resources like more powerful CPUs or GPUs.

## Operating Cost

GPU instances for NLP models during document validation. Other libraries are also free to use and have their monthly limits like the Tavily Search and Groq Chat.

## Development Team

ScientiFolks

|              Name             |                    GitHub                     |
| ----------------------------- | --------------------------------------------- |
| Akmal Mahardika N.P.          | [akmaldika](https://github.com/akmaldika)     |
| Ghazi Akmal Fauzan            | [ghaziakmalf](https://github.com/ghaziakmalf) |
| Muhammad Equilibrie Fajria    | [MuhLibri](https://github.com/MuhLibri)       |
| Muhammad Fadhil Amri          | [Mehmed13](https://github.com/Mehmed13)       |
| Muhammad Farrel D.R.          | [Breezy-DR](https://github.com/Breezy-DR)     |

## License

[MIT License](https://github.com/ScientiFolks/VeriFind?tab=MIT-1-ov-file)
