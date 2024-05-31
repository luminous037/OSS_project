import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase 구성 정보를 받아와서 Firebase 초기화 후에 requestForToken 함수 실행
export const initializeFirebase = (firebaseConfig) => {
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  // 토큰 요청 함수
  const requestForToken = () => {
    return getToken(messaging)
      .then((currentToken) => {
        if (currentToken) {
          console.log('클라이언트 토큰 확인');
          return currentToken;
        } else {
          console.log('권한 없음');
        }
      }).catch((err) => {
        console.log('토큰 에러: ', err);
      });
  };

  // 메시지 수신 리스너
  const onMessageListener = () =>
    new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    });

  return {
    requestForToken,
    onMessageListener
  };
};