import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss'
import { ThemeContext } from './contexts/ThemeContext';
import { themes } from './contexts/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ThemeContext.Provider value={themes} >
            <App />
        </ThemeContext.Provider>
    </BrowserRouter>
);