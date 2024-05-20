import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './InfoPage_2.css';

<img src="/edge.jpg"></img>



function InfoPage_2() {
  const [buttonStates, setButtonStates] = useState({ //아침 점심 저녁
    morning: false,
    afternoon: false,
    evening: false 
});

const toggleButton = (buttonName) => {
    setButtonStates(prevState => ({
        ...prevState,
        [buttonName]: !prevState[buttonName]
    }));
};

const [checkBox, setCheckBox] = useState({  //식 전후
    before: false,
    after: false
});

const toggleCheckBox = (checkBoxName) => { 
    setCheckBox(prevState => ({
        ...prevState,
        [checkBoxName]: !prevState[checkBoxName]
    }));
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
          onClick={() => toggleButton('morning')}
          style={{ 
            backgroundColor: buttonStates.morning ? '#87CEEB' : 'white', 
            color: buttonStates.morning ? 'white' : '#87CEEB',
            border: buttonStates.morning ? '2px solid #87CEEB' : '2px solid #87CEEB',
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
          onClick={() => toggleButton('afternoon')}
          style={{ 
            backgroundColor:  buttonStates.afternoon ? '#87CEEB' : 'white', 
            color:  buttonStates.afternoon ? 'white' : '#87CEEB',
            border:  buttonStates.afternoon ? '2px solid #87CEEB' : '2px solid #87CEEB',
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
          onClick={() => toggleButton('evening')}
          style={{ 
            backgroundColor:  buttonStates.evening? '#87CEEB' : 'white', 
            color:  buttonStates.evening ? 'white' : '#87CEEB',
            border:  buttonStates.evening ? '2px solid #87CEEB' : '2px solid #87CEEB',
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
          checked={checkBox.after} // 현재 상태에 따라 체크 여부 결정
          onChange={() => toggleCheckBox('after')} // 체크박스 상태 변경 시 호출되는 함수
        />
        <label>식후 30분</label>
        </div>


       <div className="before">
         <input
          type="checkbox" //체크박스2
          checked={checkBox.before} 
          onChange={() => toggleCheckBox('before')} 
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
