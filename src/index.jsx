import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss'
import { ThemeContext } from './contexts/ThemeContext';
import { themes } from './contexts/ThemeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeContext.Provider value={themes} >
        <App />
    </ThemeContext.Provider>
);