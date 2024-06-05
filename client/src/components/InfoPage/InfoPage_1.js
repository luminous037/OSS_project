import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InfoPage_1.css';
import { initializeFirebase } from './../../PushAlarmSetting';



function InfoPage_1() {
  const [childName, setChildName] = useState({
    userName: ''
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate();

  
  const sendSubscriptionToServer = async (token) => {
    await fetch('http://localhost:4000/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });
  };
  
  
  // Firebase 구성 정보를 받아와서 Firebase 초기화 및 관련 작업 수행
  fetch('/firebase-config')
    .then(response => response.json())
    .then(firebaseConfig => {
      // Firebase 초기화
      const { requestForToken, onMessageListener } = initializeFirebase(firebaseConfig);
  
      // 토큰 요청 및 서버에 푸시 알림 구독 요청
      requestForToken().then(token => {
        if (token) {
          sendSubscriptionToServer(token);
        }
      });
  
      // 메시지 수신 리스너 등록
      onMessageListener().then(payload => {
        //console.log('Message received. ', payload);
      });
  
    })
    .catch(error => {
      console.error('Firebase Config Fetch 오류:', error);
    });
  

  useEffect(() => {
    // 이름이 입력되었는지 확인하여 버튼 활성화 상태를 업데이트
    setIsButtonDisabled(childName.userName.trim() === '');
  }, [childName.userName]);

  const nameSave = () => { // 데이터베이스에 이름 저장
    fetch('http://localhost:4000/saveName', {
      method: 'POST',
      headers: {
        credentials: 'include',
        'Content-Type': 'application/json' // JSON 형식으로 전송
      },
      body: JSON.stringify(childName) // 사용자 이름을 body에 저장      
    })
      .then(res => res.json()) // 응답을 JSON으로 파싱
      .then(data => {
        navigate(`/InfoPage_1/InfoPage_2?userID=${data._id}`); // 파싱된 데이터에서 _id 사용
      })
      .catch(err => {
        console.error('namePost 중 오류: ', err);
      });
  }

  return (
    <div className="Page1">
      <div className='title_info'>
        MeddyBaby
      </div>
      <div className="text2">
        우리아이 이름은
      </div>
      <div className="nameBlank">
        <input
          type="text"
          value={childName.userName}
          onChange={(e) => setChildName({ userName: e.target.value })}
        />
      </div>
      <div className="text3">
        어린이
      </div>
      <div className="navigator">
        <button onClick={nameSave} className="nav-item" disabled={isButtonDisabled}>다음</button>
      </div>
    </div>
  );
}

export default InfoPage_1;
