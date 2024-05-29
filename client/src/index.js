import React from 'react';
import ReactDOM from 'react-dom';
import './components/index.css';
//import { BrowserRouter as Router } from 'react-router-dom'; // BrowserRouter를 import합니다.
import App from './components/App';
import reportWebVitals from './components/reportWebVitals';
import { requestForToken, onMessageListener } from './firebaseConfig';

const sendSubscriptionToServer = async (token) => {
  await fetch('http://localhost:4000/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  });
};

requestForToken().then(token => {
  if (token) {
    sendSubscriptionToServer(token);
  }
});

onMessageListener().then(payload => {
    console.log('Message received. ', payload);
    // 푸시 알림을 화면에 표시
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    //<React.StrictMode>
        <App/> 
    //</React.StrictMode>

    
);

reportWebVitals();