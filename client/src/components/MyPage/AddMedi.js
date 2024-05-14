import { useState} from 'react';
import {useNavigate} from 'react-router-dom';

function AddMedi() {
    
    const [mediData, setMediData] = useState({ //약 정보 저장할 배열
        mediName: '',
        time: '',
        detail: ''
    });


    const navigate=useNavigate();
    const saveDetail=()=>{ //저장 후 마이페이지 이동
        navigate('/MyPage');
    };

    const fetchData = () => { // fetch 요청 함수
        fetch('http://localhost:4000/addList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // JSON 형식으로 전송
            },
            body: JSON.stringify(mediData) // 약 정보를 body에 저장
            
        })
        .then( ()=>{saveDetail();})
        .catch(err => {
            console.error('fetchData 중 오류: ',err);
        });
    };

    const handleChange = (e) => { //데이터 입력 시
        setMediData({
            ...mediData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="detailPage">

        <div className="detail_top">
          <h1>상세 정보</h1>
          <br></br>
        </div>
        <div className="detail_list">
            <div className="detail_text">
                <h2>먹는 약</h2>
                <input type="text" name="mediName" value={mediData.mediName} onChange={handleChange} />
            </div>
                <br></br>
            <div className="detail_text">
                <h2>설정한 시간</h2>
                <input type="text" name="time" value={mediData.time} onChange={handleChange} />
            </div>
                <br></br>
            <div className="detail_text_no-border">
                <h2>복용법</h2>
                <AddInfo/>
            </div>
        </div>
    
        <button onClick={fetchData} className="save_button" ><h2>저장</h2></button>
    </div> 
    );
}

function AddInfo(){

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

export default AddMedi;