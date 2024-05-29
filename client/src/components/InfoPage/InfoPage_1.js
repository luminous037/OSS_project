import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './InfoPage_1.css';

function InfoPage_1() {
  const [childName, setChildName] = useState({
    userName: ''
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate();

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
