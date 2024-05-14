import './DetailPage.css';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

function PageCanvas({name ='', time = '', detail = ''}){ //detail에 나타나는 이미 저장된 값

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
                <h4><input defaultValue={name}></input></h4>
            </div>
                <br></br>
            <div className="detail_text">
                <h2>설정한 시간</h2>
                <h4><input defaultValue={time}></input></h4>
            </div>
                <br></br>
            <div className="detail_text_no-border">
                <h2>복용법</h2>
                <AddInfoCanvas/>
            </div>
        </div>
    
        <button onClick={saveDetail} className="save_button" ><h2>저장</h2></button>
    
    </div>
    )
}

function AddInfoCanvas(){

  const [buttonStates, setButtonStates] = useState({
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

  const [checkBox, setcheckBox] = useState({
    before: false,
    after: false
  })

  const toggleCheckBox = (checkBoxName)=>{
    setcheckBox(prevState=> ({
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
      <div>
        <button onClick={() => toggleButton('morning')} style={{ backgroundColor: buttonStates.morning ? ' rgb(88, 148, 218)' : 'white', color: buttonStates.morning ? 'white' : 'black' }}>
          아침
        </button>

        <button onClick={()=>toggleButton('afternoon')} style={{ backgroundColor: buttonStates.afternoon ? ' rgb(88, 148, 218)' : 'white', color: buttonStates.afternoon ? 'white' : 'black' }}>
          점심
        </button>

        <button onClick={()=>toggleButton('evening')} style={{ backgroundColor: buttonStates.evening ? ' rgb(88, 148, 218)' : 'white', color: buttonStates.evening ? 'white' : ' black' }}>
          저녁
        </button>
        <br />

        <input type="checkbox" checked={checkBox.after} onChange={()=>toggleCheckBox('after')}/>
        <label>식후 30분</label>

        <input type="checkbox" checked={checkBox.before} onChange={()=>toggleCheckBox('before')}/>
        <label>식전 30분</label>

        <br /> 매<input type="text" value={time} onChange={handleTimeChange} placeholder="시간 입력" />
        시간마다 의사 지시대로 

      </div>
    );
}

export {PageCanvas, AddInfoCanvas};
