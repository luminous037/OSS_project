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

jest.mock('node-cron');

// firebase-admin 모듈 목업
jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
  },
  messaging: () => ({
    send: jest.fn(),
  }),
}));

describe('sendPushNotifications 함수', () => {
  it('notification에서 send 함수를 호출해야 합니다', async () => {
    // 푸시 알림에 사용될 토큰과 메시지
    const token = '모의 토큰';
    const message = {
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
    };

    // send 함수를 spyOn하여 호출되었는지 확인합니다.
    const sendSpy = jest.spyOn(admin.messaging(), 'send');

    // 함수를 호출합니다.
    await sendPushNotifications(token);

    // send 함수가 올바른 매개변수와 함께 호출되었는지 확인합니다.
    expect(sendSpy).toHaveBeenCalledWith(message);

    // spyOn을 제거합니다.
    sendSpy.mockRestore();
  });
});


describe('scheduleNotifications 함수', () => {
  it('사용자가 설정한 시간에 알림이 전송되어야 합니다', async () => {
    jest.useFakeTimers(); // Jest 타이머 사용

    const user_id = 'user1';
    const medi_id = 'medi1';
    const currentTime = new Date(); // 현재 시간
    const scheduledTime = new Date(currentTime.getTime() + 1000); // 1초 뒤 시간 예약

    // sendPushNotifications 함수를 spyOn하여 호출 여부를 확인
    const sendPushNotificationsSpy = jest.spyOn(require('./PushAlarm'), 'sendPushNotifications');

    // scheduleNotifications 함수 호출
    await scheduleNotifications(user_id, medi_id);

    // sendPushNotifications 함수가 올바른 매개변수와 함께 호출되었는지 확인
    expect(sendPushNotificationsSpy).toHaveBeenCalledWith(user_id);

    jest.useRealTimers(); // Jest 타이머 초기화
  });
});


describe('cancelAndDeleteSchedules', () => {
  // Your test cases for cancelAndDeleteSchedules function
});

describe('initializeScheduledTasks', () => {
  // Your test cases for initializeScheduledTasks function
});