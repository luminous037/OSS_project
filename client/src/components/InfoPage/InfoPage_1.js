import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './InfoPage_1.css';

function InfoPage_1() {
  const [childName, setChildName] = useState({
    userName: ''
  });

  const navigate=useNavigate();

  const nameSave = ()=>{ //데이터베이스에 이름 저장
    fetch('http://localhost:4000/saveName', {
      method: 'POST',
      headers: {
          credentials: 'include',
          'Content-Type': 'application/json' // JSON 형식으로 전송
      },
      body: JSON.stringify(childName) // 사용자 이름을 body에 저장      
    }).then(response =>{
      if (response.ok) {
        navigate('/InfoPage_1/InfoPage_2'); // 저장 후 페이지 이동
      }
    })
    .catch(err => {
       console.error('namePost 중 오류: ',err);
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
          onChange={(e) => setChildName({ userName: e.target.value})}
          />
      </div>

      <div className="text3">  
        어린이
      </div>


      <div className="navigator">
        
        <button onClick={nameSave} className="nav-item">다음</button>
      </div>
    </div>
  );
}


export default InfoPage_1;