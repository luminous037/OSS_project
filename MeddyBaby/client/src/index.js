import React from 'react';
import ReactDOM from 'react-dom';
import './components/index.css';
//import { BrowserRouter as Router } from 'react-router-dom'; // BrowserRouter를 import합니다.
import App from './components/App';
import reportWebVitals from './components/reportWebVitals';


    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <App/> 
    );


reportWebVitals();
