const cron = require('node-cron');
const admin = require('firebase-admin');
const { MongoClient } = require('mongodb');
const { getDatabase } = require('./DbConnect');
const { ObjectId } = require('mongodb');
const serviceAccount = require("./serviceAccountKey.json");
const {
  sendPushNotifications,
  scheduleNotifications,
  cancelAndDeleteSchedules,
  initializeScheduledTasks
} = require('./PushAlarm');

// Firebase Admin SDK 초기화
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


// firebase-admin 모듈 목업
jest.mock('firebase-admin', () => ({
  credential: {
    cert: jest.fn(),
  },
  messaging: jest.fn(() => ({
    send: jest.fn(),
  })),
  initializeApp: jest.fn(),
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
          link: 'http://localhost:3000/Alarm', // 사용자가 알림을 클릭했을 때 이동할 링크
        },
        notification: {
          icon: '/myPage_profile1.png', // 아이콘 경로
        },
      },
      token: token
    });
  });
});


describe('scheduleNotifications', () => {
  // Mocking collections and data for test
  const mockUserCollection = [
    { _id: 'user1', token: 'user1_token' },
    { _id: 'user2', token: 'user2_token' },
  ];
  const mockMediListCollection = [
    { _id: 'medi1', detail: { morning: true, ampm1: 'AM', hour1: '8', minute1: '0' } },
    { _id: 'medi2', detail: { afternoon: true, ampm2: 'PM', hour2: '1', minute2: '30' } },
  ];

  // Mocking getDatabase function
  jest.spyOn(require('./DbConnect'), 'getDatabase').mockImplementation(() => ({
    collection: (name) => {
      if (name === 'user') return mockUserCollection;
      if (name === 'medicineList') return mockMediListCollection;
      // Add more mocks if needed
    },
  }));

  test('does not schedule notifications when user is not found', async () => {
    await scheduleNotifications('nonexistent_user_id', 'medi1');
    // expect no push notifications to be sent
    expect(sendPushNotifications).not.toHaveBeenCalled();
  });

  test('does not schedule notifications when medicine list is empty', async () => {
    await scheduleNotifications('user1', 'nonexistent_medi_id');
    // expect no push notifications to be sent
    expect(sendPushNotifications).not.toHaveBeenCalled();
  });

  // Write more test cases for different scenarios
});


describe('cancelAndDeleteSchedules', () => {
  // Your test cases for cancelAndDeleteSchedules function
});

describe('initializeScheduledTasks', () => {
  // Your test cases for initializeScheduledTasks function
});