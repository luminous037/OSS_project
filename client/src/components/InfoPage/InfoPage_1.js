import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InfoPage_1.css';
import { initializeFirebase } from './../../PushAlarmSetting';
import { usePrompt } from '../../PromptContext';

function InfoPage_1() {
  const [childName, setChildName] = useState({ userName: '' });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [warningMessage, setWarningMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const [deferredPrompt, setDeferredPrompt] = useState(null);

useEffect(() => {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    setDeferredPrompt(event);
  });
}, []);

  const navigate = useNavigate();


  const handleAddToHomeScreen = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
          setShowModal(false);
        } else {
          console.log('User dismissed the A2HS prompt');
        }
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

  useEffect(() => {
    fetch('/firebase-config')
      .then(response => response.json())
      .then(firebaseConfig => {
        const { requestForToken, onMessageListener } = initializeFirebase(firebaseConfig);

        requestForToken().then(token => {
          if (token) {
            sendSubscriptionToServer(token);
          }
        });

        onMessageListener().then(payload => {
          //console.log('Message received. ', payload);
        });
      })
      .catch(error => {
        console.error('Firebase Config Fetch 오류:', error);
      });
  }, []);

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

  // 페이지 로드 시 모달을 표시하기 위한 useEffect
  useEffect(() => {
    setShowModal(true);
  }, []);

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
        console.error('namePost 중 오류: ', err);
      });
  };

  const handleCloseModal = () => {
    const userChoice = window.confirm('앱을 다운하지 않으면 알람을 사용하지 못할 수 있습니다.');
    if (userChoice) {
      setShowModal(false);
      setShowWarning(false);
    }
  };

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
      {warningMessage && <div className="warning">{warningMessage}</div>}
      <div className="text3">
        어린이
      </div>

      <div className="navigator">
        <button onClick={nameSave} className="nav-item" disabled={isButtonDisabled}>다음</button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal_info1">
            <div className="moda_info1_content">
              <h2>MeddyBaby를 <br />앱으로 사용합니다.</h2>
              <p>앱을 다운로드하여 알람소리를 허용합니다.</p>
              
              {deferredPrompt && (
              <button  onClick={handleAddToHomeScreen}className='modal-button'>다운로드로 이동</button>
               )}

              <button onClick={handleCloseModal} className="modal-button">알람소리를 허용하지 않습니다.</button>
            </div>
          </div>
        </div>
      )}

      {showWarning && (
        <div className="warning">
          앱을 다운하지 않으면 알람을 사용하지 못할 수 있습니다.
        </div>
      )}
    </div>
  );
}

export default InfoPage_1;
