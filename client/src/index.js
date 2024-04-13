import React from 'react';
import ReactDOM from 'react-dom';
import './components/index.css';
import { BrowserRouter as Router } from 'react-router-dom'; // BrowserRouter를 import합니다.
import App from './components/App';
import reportWebVitals from './components/reportWebVitals';
import MyPage from './components/MyPage/MyPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/> 
    </React.StrictMode>
);

reportWebVitals();
