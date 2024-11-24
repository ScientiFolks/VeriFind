# VeriFind - Academic Literature Search and Validation

A React-based web application that enables users to search academic literature and validate research documents with ease.

## Project Structure
```
├── public/
│   └── VeriFind.ico
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   │   ├── AnonymousePro-Bold.ttf
│   │   │   └── AnonymousePro-Regular.ttf
│   │   └── icons/
│   │       └── upload.svg
│   ├── components/
│   │   ├── Button/
│   │   │   ├── ToggleButton.jsx
│   │   │   └── VerifyInputText.jsx
│   │   ├── Find/
│   │   │   └── Find.jsx
│   │   ├── Text/
│   │   │   └── BoldText.jsx
│   │   └── Verify/
│   │       └── Verify.jsx
│   └── services/
│       └── api.js
```

## Features

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
- React + Vite
- TailwindCSS for styling
- React Icons
- React Toastify for notifications
- Axios for API requests

## Getting Started

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

5. Create `.env` file in root directory
```
VITE_APP_API_URL=[backend-api-url]
```

6. Start development server
```bash
npm run dev
```

## API Integration
The application integrates with a backend service for:
- Literature search functionality
- Document validation and analysis

## Environment Variables
- `VITE_APP_API_URL`: Backend API endpoint

## Development Team
ScientiFolks

## License
MIT License