import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DetailPage.css';

function AddMedi() {
    const [mediData, setMediData] = useState({ //기본 데이터 저장 구조
        mediName: '',
        time: '',
        detail: {
            morning: false,
            afternoon: false,
            evening: false,
            before: false,
            after: false,
            time: ''
        }
    });

    const navigate = useNavigate();

    const goToMypage = () => { //mypage 이동
        navigate('/MyPage');
    };

    const fetchData = (data) => { //데이터 저장
        fetch('http://localhost:4000/addList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            goToMypage();
        })
        .catch(err => {
            console.error('fetchData 중 오류: ', err);
        });
    };

    const handleChange = (e) => { //medidata 이름, 시간 수정
        setMediData({
            ...mediData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => { //medidata 복용법 수정
        const infoData = {
            morning: buttonStates.morning,
            afternoon: buttonStates.afternoon,
            evening: buttonStates.evening,
            before: checkBox.before,
            after: checkBox.after,
            time: time
        };
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

    useEffect(() => {
      console.log('현재 상태:', checkBox);
  }, [checkBox]); // buttonStates 상태가 변경될 때마다 실행

    const [time, setTime] = useState(''); //매 time 시간마다

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    //시간 설정 모달 창
    const [modalState, setModalState] = useState({
        modalOpen1: false,
        modalOpen2: false,
        modalOpen3: false,
      });

      //시간설정
      const [timeSettings, setTimeSettings] = useState({ //알람 시간
        ampm1: 'AM',
        hour1: 9,
        minute1: 0,
        ampm2: 'PM',
        hour2: 12,
        minute2: 0,
        ampm3: 'PM',
        hour3: 6,
        minute3: 0,
      });
    
      //알람 설정 state
      const [alarm, setalarm] = useState(false);
    
      const handleModalOpen = (buttonId) => {
        setModalState(prevState => ({
          ...prevState,
          [`modalOpen${buttonId}`]: true,
        }));
      };
    
      const handleModalClose = (buttonId) => {
        setModalState(prevState => ({
          ...prevState,
          [`modalOpen${buttonId}`]: false,
        }));
      };
        //모달 창 내 오전 오후 설정 체크창
      const handleAMPMChange = (buttonId, event) => {
        setTimeSettings(prevState => ({
          ...prevState,
          [`ampm${buttonId}`]: event.target.value,
        }));
      };
    // 시간 변경모듈
      const handleHourChange = (buttonId, event) => {
        setTimeSettings(prevState => ({
          ...prevState,
          [`hour${buttonId}`]: event.target.value,
        }));
      };
    //분 변경 모듈
      const handleMinuteChange = (buttonId, event) => {
        setTimeSettings(prevState => ({
          ...prevState,
          [`minute${buttonId}`]: event.target.value,
        }));
      };

      //설정 확인 버튼
      const handleConfirm = (buttonId) => {
        handleModalClose(buttonId);
      };
    
      //버튼 누를 시 알람 설정됨
      const setAlarm = () => {
        alert("알람이 설정되었습니다.");
        setalarm(true);
      };

      //info2에서 설정한 아침 점심 저녁이 true일 경우 알람 설정 버튼을 추가하는 함수
      const renderButtonIfTrue = (condition, buttonId) => {
        if (condition) {
          return (
            <div key={buttonId}>
              <button onClick={() => handleModalOpen(buttonId)}>
                {`(${timeSettings[`ampm${buttonId}`]} ${timeSettings[`hour${buttonId}`]}:${timeSettings[`minute${buttonId}`]})`}
              </button>
    
              {modalState[`modalOpen${buttonId}`] && (
                <div className="modal_info3">
                  <div className="modal-content">
                    <h5>시간설정</h5>
                    <div className='setTime'>
    
                    <select value={timeSettings[`ampm${buttonId}`]} onChange={(e) => handleAMPMChange(buttonId, e)}>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                    <input type="number" value={timeSettings[`hour${buttonId}`]} onChange={(e) => handleHourChange(buttonId, e)} min="1" max="12" />
                    <span>:</span>
                    <input type="number" value={timeSettings[`minute${buttonId}`]} onChange={(e) => handleMinuteChange(buttonId, e)} min="0" max="59" />
                    
                  </div>
                  <button onClick={() => handleModalClose(buttonId)}>취소</button>
                   <button onClick={() => handleConfirm(buttonId)}>확인</button>
                    </div>
                </div>
              )}
            </div>
          );
        }
        return null;
      };


    return (
        <div className="detailPage">
            <div className="detail_top">
                <h1>상세 정보<button className="back_button" onClick={goToMypage}>
                    <img className="backButton_img" src="/backButton.png" alt="back Button"/></button>
                </h1>
                <br />
            </div>
            <div className="detail_list">
                <div className="detail_text">
                    <h2>먹는 약</h2>
                    <input type="text" name="mediName" value={mediData.mediName} onChange={handleChange} />
                </div>
                <br />
                <div className="detail_text">
                    <h2>설정한 시간</h2>
                    <input type="text" name="time" value={mediData.time} onChange={handleChange} />
                </div>
                <br />
                <div className="detail_text_no-border">
                    <h2>복용법</h2>
                    <div>
                        <button onClick={() => toggleButton('morning')} style={{ backgroundColor: buttonStates.morning ? ' rgb(88, 148, 218)' : 'white', color: buttonStates.morning ? 'white' : 'black' }}>
                            아침
                        </button>
                        <button onClick={() => toggleButton('afternoon')} style={{ backgroundColor: buttonStates.afternoon ? ' rgb(88, 148, 218)' : 'white', color: buttonStates.afternoon ? 'white' : 'black' }}>
                            점심
                        </button>
                        <button onClick={() => toggleButton('evening')} style={{ backgroundColor: buttonStates.evening ? ' rgb(88, 148, 218)' : 'white', color: buttonStates.evening ? 'white' : ' black' }}>
                            저녁
                        </button>
                        <br />
                        <input type="checkbox" checked={checkBox.before} onChange={() => toggleCheckBox('before')} />
                        <label>식전 30분</label>
                        <input type="checkbox" checked={checkBox.after} onChange={() => toggleCheckBox('after')} />
                        <label>식후 30분</label>
                        <br />
                        매<input type="text" value={time} onChange={handleTimeChange} placeholder="시간 입력" />
                        시간마다 의사 지시대로
                    </div>
                </div>
            </div>
            <button onClick={handleSave} className="save_button" ><h2>저장</h2></button>
        </div> 
    );
}

export default AddMedi;
