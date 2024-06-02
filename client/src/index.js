import React from 'react';
import ReactDOM from 'react-dom';
import './components/index.css';
import App from './components/App';
import reportWebVitals from './components/reportWebVitals';
import { initializeFirebase } from './PushAlarmSetting';

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
};

const initializeAppWithFirebase = () => {
  fetch('/firebase-config') // Firebase 구성 정보를 받아와서 Firebase 초기화 및 관련 작업 수행
    .then(response => response.json())
    .then(firebaseConfig => {
      // Firebase 초기화
      const { requestForToken, onMessageListener } = initializeFirebase(firebaseConfig);

      // 토큰 요청 및 서버에 푸시 알림 구독 요청
      requestForToken().then(token => {
        if (token) {
          sendSubscriptionToServer(token);
        }
      });

      // 메시지 수신 리스너 등록
      onMessageListener().then(payload => {
        console.log('메세지 받음 ', payload);
        // 푸시 알림을 화면에 표시
      });

      // React 앱 렌더링
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);
    })
    .catch(error => {
      console.error('Firebase Config Fetch 오류:', error);
    });
};

requestNotificationPermission() // 알림 권한 요청
  .then((permission) => {
    if (permission === "granted") {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/firebase-messaging-sw.js')
          .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
            initializeAppWithFirebase(); // 서비스 워커가 등록된 후에 Firebase 초기화
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      }
    }
  });

reportWebVitals();
