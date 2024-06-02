import React from 'react';
import ReactDOM from 'react-dom';
import './components/index.css';
//import { BrowserRouter as Router } from 'react-router-dom'; // BrowserRouter를 import합니다.
import App from './components/App';
import reportWebVitals from './components/reportWebVitals';
import { initializeFirebase} from './PushAlarmSetting';


const sendSubscriptionToServer = async (token) => {
  await fetch('http://localhost:4000/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  });
};


const requestNotificationPermission = () => {
  console.log("권한 요청 중...");
  return Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("알림 권한이 허용됨");
    } else {
      console.log("알림 권한 허용 안됨");
    }
    return permission;
  });
}


requestNotificationPermission() // 알림 권한 요청
  .then((permission) => {
    if (permission === "granted") {
      fetch('/firebase-config') // Firebase 구성 정보를 받아와서 Firebase 초기화 및 관련 작업 수행
        .then(response => response.json())
        .then(firebaseConfig => {
          // Firebase 초기화
          const { requestForToken, onMessageListener } = initializeFirebase(firebaseConfig);

          // 토큰 요청 및 서버에 푸시 알림 구독 요청
          requestForToken().then(token => {
            if (token) {
              console.log(token);
              sendSubscriptionToServer(token);
            }
          });

          // 메시지 수신 리스너 등록
          onMessageListener().then(payload => {
            console.log('Message received. ', payload);
            // 푸시 알림을 화면에 표시
          });

          // React 앱 렌더링
          const root = ReactDOM.createRoot(document.getElementById('root'));
          root.render(<App />);
        })
        .catch(error => {
          console.error('Firebase Config Fetch 오류:', error);
        });
    }
  });

reportWebVitals();
