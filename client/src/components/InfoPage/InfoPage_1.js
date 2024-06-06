import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InfoPage_1.css';
import { initializeFirebase } from './../../PushAlarmSetting';



function InfoPage_1() {
  const [childName, setChildName] = useState({
    userName: ''
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [warningMessage, setWarningMessage] = useState('');

  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState(null);

     // 'beforeinstallprompt' 이벤트 처리
     const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
  

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const handleAddToHomeScreen = () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choiceResult => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          setDeferredPrompt(null);
        });
      }
    };
    
  
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
      //console.error('Firebase Config Fetch 오류:', error);
    });
  

  useEffect(() => {
    const nameLength = childName.userName.trim().length;
    if (nameLength === 0) {
      setIsButtonDisabled(true);
      setWarningMessage('');
    } else if (nameLength > 6) {
      setIsButtonDisabled(true);
      setWarningMessage('이름이 6자를 넘을 수 없습니다');
    } else {
      setIsButtonDisabled(false);
      setWarningMessage('');
    }
  }, [childName.userName]);

  const nameSave = () => {
    fetch('http://localhost:4000/saveName', {
      method: 'POST',
      headers: {
        credentials: 'include',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(childName)
    })
      .then(res => res.json())
      .then(data => {
        navigate(`/InfoPage_1/InfoPage_2?userID=${data._id}`);
      })
      .catch(err => {
        //console.error('namePost 중 오류: ', err);
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
          maxLength={7} // 최대 입력 길이를 7로 설정
        />
      </div>
      {warningMessage && <div className="warning">{warningMessage}</div>} {
      }
      <div className="text3">
        어린이
      </div>

      {deferredPrompt && (
          <button className="add-to-home-screen-button" onClick={handleAddToHomeScreen}>Add to Home Screen</button>
        )}

      <div className="navigator">
        <button onClick={nameSave} className="nav-item" disabled={isButtonDisabled}>다음</button>
      </div>
    </div>
  );
}

export default InfoPage_1;
