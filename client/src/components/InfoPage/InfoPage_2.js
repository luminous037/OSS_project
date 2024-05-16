import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './InfoPage_2.css';

<img src="/edge.jpg"></img>



function InfoPage_2() {
    // 첫 번째 체크박스의 상태를 관리하는 useState 훅 사용
    const [isChecked1, setIsChecked1] = useState(false);
  
    // 첫 번째 체크박스 상태를 토글하는 함수
    const toggleCheckbox1 = () => {
      setIsChecked1(!isChecked1);
    };

    // 두 번째 체크박스의 상태를 관리하는 useState 훅 사용
    const [isChecked2, setIsChecked2] = useState(false);
  
    // 두 번째 체크박스 상태를 토글하는 함수
    const toggleCheckbox2 = () => {
      setIsChecked2(!isChecked2);
    };

    // 각 버튼의 상태를 관리하는 useState 훅 사용
    const [isButtonChecked1, setIsButtonChecked1] = useState(false);
    const [isButtonChecked2, setIsButtonChecked2] = useState(false);
    const [isButtonChecked3, setIsButtonChecked3] = useState(false);

    // 각 버튼의 상태를 토글하는 함수
    const toggleButton1 = () => {
      setIsButtonChecked1(!isButtonChecked1);
    };
    
    const toggleButton2 = () => {
      setIsButtonChecked2(!isButtonChecked2);
    };
    
    const toggleButton3 = () => {
      setIsButtonChecked3(!isButtonChecked3);
    };

    // 시간 입력을 위한 상태와 상태 변경 함수
    const [time, setTime] = useState('');

    const handleTimeChange = (event) => {
      setTime(event.target.value);
    };

    const [childName, setUserName] = useState('');

    useEffect(() => {
      fetch('/userProfile')
      .then(response => response.json())
      .then(data => {
        const userName = data.map(user => user.userName);     // 받은 데이터에서 이름만 추출
        setUserName(userName);
      })
      .catch(error => {
          console.error('유저 정보를 가져오는 중 에러:', error);
      });
    }, []);
  
  
    return (

     <div className="Page2">
      <div className="text1">
        <h1>
        MeddyBaby
      </h1>
      </div>
      
  
      <div className="background2">
        <h1>{childName}</h1>
      </div>
      
       <div className="buttons">
        
        <div className="morning">
        <button 
          onClick={toggleButton1}
          style={{ 
            backgroundColor: isButtonChecked1 ? '#87CEEB' : 'white', 
            color: isButtonChecked1 ? 'white' : '#87CEEB',
            border: isButtonChecked1 ? '2px solid #87CEEB' : '2px solid #87CEEB',
            borderRadius: '30px', // 테두리 둥글기 조절 // 테두리 색상을 동적으로 변경
            padding: '0px 25px', 
            fontSize: '8px' // 폰트 크기 조절
          }}
        >
          <h1>
          아침
          </h1>

        </button>
        </div>

        <div calssName="lunch">
          

        <button 
          onClick={toggleButton2}
          style={{ 
            backgroundColor: isButtonChecked2 ? '#87CEEB' : 'white', 
            color: isButtonChecked2 ? 'white' : '#87CEEB',
            border: isButtonChecked2 ? '2px solid #87CEEB' : '2px solid #87CEEB',
            borderRadius: '30px', // 테두리 둥글기 조절 // 테두리 색상을 동적으로 변경
            padding: '0px 25px', /* 내부 여백 조절 (위 아래 10px, 좌 우 20px) */
            fontSize: '8px'
          }}
        >
          <h1>
          점심
          </h1>

        </button>
        </div>

        <div className="dinner">

        <button 
          onClick={toggleButton3}
          style={{ 
            backgroundColor: isButtonChecked3 ? '#87CEEB' : 'white', 
            color: isButtonChecked3 ? 'white' : '#87CEEB',
            border: isButtonChecked3 ? '2px solid #87CEEB' : '2px solid #87CEEB',
            borderRadius: '30px', // 테두리 둥글기 조절 // 테두리 색상을 동적으로 변경
            padding: '0px 25px', 
            fontSize: '8px'
          }}
        >
          <h1>
          저녁
          </h1>

        </button>

        </div>

       </div>

        

        <div className="checkbox">

        <div className="after">
        <input
          type="checkbox" //체크박스1
          checked={isChecked1} // 현재 상태에 따라 체크 여부 결정
          onChange={toggleCheckbox1} // 체크박스 상태 변경 시 호출되는 함수
        />
        <label>식후 30분</label>
        </div>


       <div className="before">
         <input
          type="checkbox" //체크박스2
          checked={isChecked2} 
          onChange={toggleCheckbox2} 
        />
        <label>식전 30분</label>
       </div>

        </div>

        <div className="timeset">
        
        매

        <input
          type="text"
          value={time}
          onChange={handleTimeChange}
          placeholder="시간 입력"
        />

        시간마다 의사 지시대로 

        </div>
        

        <div className="navigator">
       <Link to="./InfoPage_3" className="nav-item">다음</Link>
      </div>

     </div>

    );
}

export default InfoPage_2;
