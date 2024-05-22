import { getToken } from 'firebase/messaging';

const token = await getToken(messaging, {
  vapidKey: process.env.REACT_APP_VAPID_KEY ,
});