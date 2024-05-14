import './DetailPage.css';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

function PageCanvas({name ='', time = '', detail = ''}){

    const navigate=useNavigate();
    const saveDetail=()=>{ //저장 후 마이페이지 이동
        navigate('/MyPage');
    };

    return(
        <div className="detailPage">

        <div className="detail_top">
          <h1>상세 정보</h1>
          <br></br>
        </div>
        <div className="detail_list">
            <div className="detail_text">
                <h2>먹는 약</h2>
                <h4>수정 가능<input defaultValue={name}></input></h4>
            </div>
                <br></br>
            <div className="detail_text">
                <h2>설정한 시간</h2>
                <h4>수정 가능<input defaultValue={time}></input></h4>
            </div>
                <br></br>
            <div className="detail_text_no-border">
                <h2>복용법</h2>
                <h4>수정 가능<input defaultValue={detail}></input></h4>
            </div>
        </div>
    
        <button onClick={saveDetail} className="save_button" ><h2>저장</h2></button>
    
    </div>
    )
}

function AddInfo(){

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
      <div>
        <button 
          onClick={toggleButton1} style={{ backgroundColor: isButtonChecked1 ? 'green' : 'white', color: isButtonChecked1 ? 'white' : 'green' }}>
          아침
        </button>

        <button onClick={toggleButton2} style={{ backgroundColor: isButtonChecked2 ? 'green' : 'white', color: isButtonChecked2 ? 'white' : 'green' }}>
          점심
        </button>

        <button onClick={toggleButton3} style={{ backgroundColor: isButtonChecked3 ? 'green' : 'white', color: isButtonChecked3 ? 'white' : 'green' }}>
          저녁
        </button>
        <br />

        <input type="checkbox" checked={isChecked1} onChange={toggleCheckbox1}/>
        <label>식후 30분</label>

        <input type="checkbox" checked={isChecked2} onChange={toggleCheckbox2}/>
        <label>식전 30분</label>

        <br /> 매<input type="text" value={time} onChange={handleTimeChange} placeholder="시간 입력" />
        시간마다 의사 지시대로 

      </div>
    );
}

export {PageCanvas, AddInfo};
