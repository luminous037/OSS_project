const cron = require('node-cron');
var admin = require('firebase-admin');
const { getDatabase } = require('./DbConnect');
const { ObjectId } = require('mongodb');
var serviceAccount = require("./serviceAccountKey.json");
const {
  sendPushNotifications,
  scheduleNotifications,
  cancelAndDeleteSchedules,
  initializeScheduledTasks
} = require('./PushAlarm');

jest.mock('firebase-admin', () => ({
  credential: {
    cert: jest.fn(),
  },
  messaging: jest.fn(() => ({
    send: jest.fn(),
  })),
}));


describe('sendPushNotifications 함수', () => {
  it('푸시 알림을 성공적으로 전송해야 합니다', async () => {
    // 토큰을 목업합니다.
    const token = '모의 토큰';

    // 함수를 호출합니다.
    await sendPushNotifications(token);

    // 어서션합니다.
    expect(admin.messaging().send).toHaveBeenCalledWith({
      notification: {
        title: 'MeddyBaby',
        body: '약 먹을 시간이에요!',
      },
      webpush: {
        fcm_options: {
          link: 'http://localhost:3000/Alarm',
        },
        notification: {
          icon: '/myPage_profile1.png',
        },
      },
      token: token,
    });
  });
});

describe('cancelAndDeleteSchedules', () => {
  // Your test cases for cancelAndDeleteSchedules function
});

describe('initializeScheduledTasks', () => {
  // Your test cases for initializeScheduledTasks function
});