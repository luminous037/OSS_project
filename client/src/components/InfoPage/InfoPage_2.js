import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InfoPage_2.css';

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
  
    return (

     <div className="Page2">
       <div className="text1">
        <h1>
        MeddyBaby
        </h1>

      </div>

      <div className="pillImage">
        <h1></h1>
      </div>

      
       <div className="buttons">
        
        <div className="morning">
        <button 
          onClick={toggleButton1} // 클릭 시 toggleButton 함수 호출
          style={{ backgroundColor: isButtonChecked1 ? 'green' : 'white', color: isButtonChecked1 ? 'white' : 'green' }} // 버튼 스타일 및 글자 색 동적으로 변경
        >
          아침
        </button>
        </div>

        <div calssName="lunch">

        <button 
          onClick={toggleButton2} // 클릭 시 toggleButton 함수 호출
          style={{ backgroundColor: isButtonChecked2 ? 'green' : 'white', color: isButtonChecked2 ? 'white' : 'green' }} // 버튼 스타일 및 글자 색 동적으로 변경
        >
          점심
        </button>
        </div>

        <div className="dinner">

        <button 
          onClick={toggleButton3} // 클릭 시 toggleButton 함수 호출
          style={{ backgroundColor: isButtonChecked3 ? 'green' : 'white', color: isButtonChecked3 ? 'white' : 'green' }} // 버튼 스타일 및 글자 색 동적으로 변경
        >
          저녁
        </button>

        </div>

       </div>

        

        <div className="checkbox">

        <input
          type="checkbox" //체크박스1
          checked={isChecked1} // 현재 상태에 따라 체크 여부 결정
          onChange={toggleCheckbox1} // 체크박스 상태 변경 시 호출되는 함수
        />
        <label>식후 30분</label>


        <input
          type="checkbox" //체크박스2
          checked={isChecked2} 
          onChange={toggleCheckbox2} 
        />
        <label>식전 30분</label>



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
