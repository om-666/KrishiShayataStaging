import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import Tailwind's styles
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create the root for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring (optional)
reportWebVitals();
