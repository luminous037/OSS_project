import React from 'react';
import ReactDOM from 'react-dom';
import './components/index.css';
import App from './components/App';
import reportWebVitals from './components/reportWebVitals';
import {CookiesProvider} from 'react-cookie'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <CookiesProvider>
                <App/> 
        </CookiesProvider>
      
);

reportWebVitals();