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
        morning: true,
        afternoon: true,
        evening: true,
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
    .then(() => {
      navigate('/InfoPage_1/InfoPage_2/InfoPage_3'); // 저장 후 페이지 이동
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
    morning: true,
    afternoon: true,
    evening: true 
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

      <div className='title_info'>
        MeddyBaby
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
      
      
       <div className="buttons_info">
        
        <div className="morning">
        <button 
          onClick={() => toggleButton('morning')}
        >
          <h1>
          아침
          </h1>

        </button>
        </div>

        <div calssName="lunch">
          

        <button 
          onClick={() => toggleButton('afternoon')}

        >
          <h1>
          점심
          </h1>

        </button>
        </div>

        <div className="dinner">

        <button 
          onClick={() => toggleButton('evening')}
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
