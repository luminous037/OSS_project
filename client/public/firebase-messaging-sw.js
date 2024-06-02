importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

fetch('/firebase-config')
  .then(response => response.json())
  .then(firebaseConfig => {
    firebase.initializeApp({
      apiKey: firebaseConfig.apiKey,
      authDomain: firebaseConfig.authDomain,
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
      messagingSenderId: firebaseConfig.messagingSenderId,
      appId: firebaseConfig.appId,
      measurementId: firebaseConfig.measurementId
    });

    const messaging = firebase.messaging();

    self.addEventListener("install", function (e) {
      console.log("Service Worker installed");
      self.skipWaiting();
    });

    self.addEventListener("activate", function (e) {
      console.log("Service Worker activated");
    });

    self.addEventListener("push", function (e) {
      if (!e.data.json()) return;

      const resultData = e.data.json().notification;
      const notificationTitle = resultData.title;
      const notificationOptions = {
        body: resultData.body,
        icon: resultData.image,
        tag: resultData.tag,
        ...resultData,
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });

    self.addEventListener("notificationclick", function (event) {
      const url = "/";
      event.notification.close();
      event.waitUntil(clients.openWindow(url));
    });
  })
  .catch(error => {
    console.error('Error fetching Firebase config:', error);
  });
