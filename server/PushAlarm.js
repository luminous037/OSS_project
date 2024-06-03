const cron = require('node-cron');
const admin = require('firebase-admin');
const { MongoClient } = require('mongodb');


admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://your-database-name.firebaseio.com'
});


//토큰 받는 함수 추가해야함


// 푸시 알림 보내는 함수
const sendPushNotifications = (token) => {
  const message = {
    notification: {
      title: 'MeddyBaby',
      body: '약 먹을 시간이에요!'
    },
    token: token
  };

  admin.messaging().send(message)
    .then((response) => {
      console.log('메세지 전송 성공:', response);
    })
    .catch((error) => {
      console.error('메세지 전송 실패:', error);
    });
};

// 알림 스케줄링 함수
const scheduleNotifications = async () => {

  try {
    const database = getDatabase();
    const userCollection = database.collection("user");
    const collection = database.collection('alarms');

    const alarms = await collection.find({}).toArray();

    alarms.forEach(alarm => {
      const [hour, minute] = alarm.alarm_time.split(':');
      const cronExpression = `${minute} ${hour} * * *`;

      cron.schedule(cronExpression, () => {
        sendPushNotifications(alarm.token);
      });

      console.log(`사용자 ${alarm.user_id}에 대한 알림이 ${alarm.alarm_time}에 스케줄링되었습니다.`);
    });
  } catch (err) {
    console.error('알람 시간 가져오기 에러:', err);
  } finally {
    await client.close();
  }
};

module.exports = scheduleNotifications;
