const cron = require('node-cron');
var admin = require('firebase-admin');
const { getDatabase } = require('./DbConnect');
const { ObjectId } = require('mongodb');
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const generateTaskId= ()=> { //고유 id 생성
  return '_' + Math.random().toString(36).substr(2, 9);
}

const scheduledTasks = []; //작업 관리

// 푸시 알림 보내는 함수
const sendPushNotifications = (token) => {
  //console.log(token);
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
  admin.messaging().send(message)
    .then((response) => {
      console.log('메세지 전송 성공',response);
    })
    .catch((error) => {
      //console.error('메세지 전송 실패:', error);
    });
};

// 알림 스케줄링 함수
const scheduleNotifications = async (user_id, medi_id) => {
  try {
    const database = getDatabase();
    const userCollection = database.collection("user");
    const mediListCollection = database.collection("medicineList");
    const scheduleCollection = database.collection("schedule");

    // 사용자 정보 가져오기
    const user = await userCollection.findOne({ _id: user_id });
    if (!user) {
      //console.error('사용자 정보를 찾을 수 없습니다.');
      return;
    }

    // mediListID 배열에 포함된 약 목록 찾기
    const mediList = await mediListCollection.find({ _id: new ObjectId(medi_id) }).toArray();

    mediList.forEach(medi => {
      const times = [
       medi.detail.morning ? { ampm: medi.time.ampm1, hour: parseInt(medi.time.hour1,10), minute: parseInt(medi.time.minute1,10)} : null,
       medi.detail. afternoon ? { ampm: medi.time.ampm2, hour: parseInt(medi.time.hour2,10), minute: parseInt(medi.time.minute2,10) } : null,
       medi.detail. evening ?  { ampm: medi.time.ampm3, hour: parseInt(medi.time.hour3,10), minute: parseInt(medi.time.minute3,10) } : null
      ].filter(time => time !== null);

      times.forEach(async time => {
        if(time===null || !time.ampm) return;
        //console.log(time);
        let { ampm, hour, minute } = time;

        if (ampm === "PM" && hour < 12) {
          hour += 12;
        } else if (ampm === "AM" && hour === 12) {
          hour = 0;
        }

        // 유효한 hour 값 확인
        if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
          //console.error('잘못된 시간 값:', { hour, minute });
          return;
        }

        const cronExpression = `${minute} ${hour} * * *`;

        const task = cron.schedule(cronExpression, () => {
          sendPushNotifications(user.token); // 사용자의 토큰으로 푸시 알림 전송
        });

        const taskID = generateTaskId();
        task.id = taskID;
        scheduledTasks.push(task);

        try {
          // 스케줄링된 작업과 관련된 정보 추가
          const result = await scheduleCollection.insertOne({
            taskId: task.id,
            mediId: new ObjectId(medi_id),
            time: cronExpression
          });

          const schedule_id = result.insertedId;

          // 사용자 문서 업데이트
          await userCollection.updateOne(
            { _id: user_id}, // 기존 이름으로 문서 찾기
            { $push: { scheduleID: schedule_id } }
          );

          console.log('알림 설정 완료');
        } catch (dbError) {
          //console.error('데이터베이스 작업 중 오류 발생:', dbError);
        }
      });
    });
  } catch (err) {
    //console.error('알람 스케줄링 중 오류 발생:', err);
  }
};


const cancelAndDeleteSchedules = async (medi_id) => {
  try {
    const database = getDatabase();
    const scheduleCollection = database.collection("schedule");
    const userCollection = database.collection("user");

    const schedules = await scheduleCollection.find({ mediId:new ObjectId(medi_id) }).toArray();

    schedules.forEach(async (schedule) => {  // 작업 중지
     
      const taskID = schedule.taskId;
      const taskIndex = scheduledTasks.findIndex(task => task.id === taskID);
      
      if (taskIndex !== -1) {
        const task = scheduledTasks[taskIndex];
        task.stop();
        scheduledTasks.splice(taskIndex, 1);  // 작업을 중지한 후 배열에서 삭제
        //console.log(`스케줄 작업 중지: ${taskID}`);
      } else {
        //console.log(`작업을 찾을 수 없습니다: ${taskID}`);
      }

      await userCollection.deleteOne({scheduleID: schedule._id});
      
      // 데이터베이스에서 스케줄링 정보 삭제
      await scheduleCollection.deleteOne({ _id: schedule._id })
        .then(() => {
          //console.log('스케줄 삭제');
        })
    });
  } catch (err) {
    //console.error('알림 스케줄링 삭제 중 오류 발생:', err);
  }
};


const initializeScheduledTasks = async (data) => {
  try {
    const database = getDatabase();
    const scheduleCollection = database.collection("schedules");
    const userCollection = database.collection("user");

    // 주어진 토큰을 사용하여 사용자 찾기
    const users = await userCollection.find({ token: data }, { projection: { _id: 0, scheduleId: 1 } }).toArray();
    
    if (users.length === 0) {
      //console.error('사용자 없음');
      return;
    }

    const scheduleIds = users.map(user => user.scheduleId);

    // scheduleIds를 사용하여 일정 가져오기
    const schedules = await scheduleCollection.find({ _id: { $in: scheduleIds.map(id => new ObjectId(id)) } }).toArray();

    schedules.forEach(schedule => {
      cron.schedule(schedule.time, () => {
        sendPushNotifications(data); // 주어진 토큰을 푸시 알림에 사용
      });
      //console.log('알림 설정 완료');
    });
  } catch (error) {
    //console.error('Error initializing scheduled tasks:', error);
  }
}


module.exports = { scheduleNotifications, cancelAndDeleteSchedules, initializeScheduledTasks }