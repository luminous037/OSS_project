import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import './InfoPage_2.css';

<img src="/edge.jpg"></img>



function InfoPage_2() {

  const [mediData, setMediData] = useState({ //기본 데이터 저장 구조
    mediName: '',
    time: '',
    date:'',
    detail: {
        morning: false,
        afternoon: false,
        evening: false,
        before: false,
        after: false,
        time: ''
    }
});

const [childName, setUserName] = useState('');

useEffect(() => {  //이름 출력
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

const handleInputChange = (event) => { //약 이름 받기 처리
  const { name, value } = event.target;
  setMediData({
    ...mediData,
    [name]: value
  });
};

const navigate=useNavigate();

const fetchData = (data) => { //데이터 저장
    fetch('http://localhost:4000/addList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json()) 
    .then((res) => {
      const id=res._id;
      console.log(id);
      navigate(`/InfoPage_1/InfoPage_2/InfoPage_3?id=${id}`); // 저장 후 페이지 이동
    })
    .catch(err => {
        console.error('fetchData 중 오류: ', err);
    });
};



const dataSave = () => { //medidata 복용법 수정
    const infoData ={
      morning: buttonStates.morning,
      afternoon: buttonStates.afternoon,
      evening: buttonStates.evening,
      before: checkBox.before,
      after: checkBox.after,
      time: time
    }
    const updatedMediData = {
      ...mediData,
      detail: infoData
    };
    setMediData(updatedMediData);
    console.log("약 정보: ",updatedMediData); // 업데이트된 mediData 객체를 콘솔에 출력
    fetchData(updatedMediData); // 저장과 함께 이동
};

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

      <div className="nameofpill">
      <label>
        약 이름:
        <input
          type="text"
          name="mediName"
          value={mediData.mediName}
          onChange={handleInputChange}
        />
      </label>
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

        <div className="date">
      <input
        type="number"
        min="1"
        max="12"
       value={mediData.date} // mediData 객체의 date 속성을 참조
        onChange={(e) => setMediData({ ...mediData, date: e.target.value })} // mediData의 date 속성을 업데이트하는 함수로 대체
        placeholder="5"
       />
          일 동안 복용
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
        <button onClick={dataSave} className="nav-item">다음</button>
      </div>

     </div>

    );
}

export default InfoPage_2;
