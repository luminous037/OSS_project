import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InfoPage_1.css';

function InfoPage_1() {
  const [childName, setChildName] = useState({
    userName: ''
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [warningMessage, setWarningMessage] = useState('');

  const navigate = useNavigate();

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
          maxLength={7} // 최대 입력 길이를 7로 설정
        />
      </div>
      {warningMessage && <div className="warning">{warningMessage}</div>} {
      }
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
