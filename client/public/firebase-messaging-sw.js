importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
          .then((registration) => {
              console.log('Service Worker registered:', registration);
          })
          .catch((error) => {
              console.error('Service Worker registration failed:', error);
          });
  });
} else {
  console.log('Service Worker is not supported in this browser.');
}

self.addEventListener("install", function (e) {
  console.log("Service Worker installed");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("Service Worker activated");
});

// 푸시 알림을 클릭했을 때 실행
self.addEventListener("notificationclick", function (event) {
  const url = "http://localhost:3000/Alarm"; // 이동할 URL 설정
  event.notification.close();
  event.waitUntil(clients.openWindow(url)); // 클라이언트 창을 열고 URL로 이동합니다.
});

fetch('/firebase-config')
  .then(response => response.json())
  .then(firebaseConfig => {
    //console.log(firebaseConfig);
    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
      //console.log('[firebase-messaging-sw.js] Received background message ', payload);
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
      };
      self.registration.showNotification(notificationTitle, notificationOptions);
    });
  })
  .catch(error => {
    console.error('Error fetching Firebase config:', error);
  });