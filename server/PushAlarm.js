const sendPushNotifications = () => { //푸시알람
    const message = {
      notification: {
        title: 'MeddyBaby',
        body: '약 먹을 시간이에요!'
      },
      tokens: token //토큰 설정하기
    };
  
    admin.messaging().sendMulticast(message)
      .then((response) => {
        console.log('메세지 전송 선공:', response);
      })
      .catch((error) => {
        console.error('메세지 전송 실패:', error);
      });
  };
  
  cron.schedule('0 9 * * *', () => {
    //첫 번째 요소(분):
    // 두 번째 요소(시간): 
    // 세 번째 요소(일): 모든 날짜를 나타내는 * 기호
    // 네 번째 요소(월): 모든 달을 나타내는 * 기호
    // 다섯 번째 요소(요일): 모든 요일을 나타내는 * 기호
    // '0 9 * * *' => "매일 오전 9시"
    sendPushNotifications();
  });