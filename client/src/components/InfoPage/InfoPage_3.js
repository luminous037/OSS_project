import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import "./InfoPage_3.css"
import InfoPage_2 from './InfoPage_2';


function InfoPage_3() {

  const [mediData, setMediData] = useState({
    mediName: '',
    time: '',
    date: '',
    detail: {
      morning: true,
      afternoon: true,
      evening: false,
      before: false,
      after: false,
      time: ''
    }
  });


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
      navigate('/Main'); // 저장 후 페이지 이동
    })
    .catch(err => {
        console.error('fetchData 중 오류: ', err);
    });
};

const dataSave = () => { //medidata 복용법 수정
  const infoData ={
    
  }
  const updatedMediData = {
    ...mediData,
    detail: infoData
  };
  setMediData(updatedMediData);
  fetchData(updatedMediData); // 저장과 함께 이동
};

  const [modalState, setModalState] = useState({
    modalOpen1: false,
    modalOpen2: false,
    modalOpen3: false,
  });

  const [timeSettings, setTimeSettings] = useState({
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

  const handleAMPMChange = (buttonId, event) => {
    setTimeSettings(prevState => ({
      ...prevState,
      [`ampm${buttonId}`]: event.target.value,
    }));
  };

  const handleHourChange = (buttonId, event) => {
    setTimeSettings(prevState => ({
      ...prevState,
      [`hour${buttonId}`]: event.target.value,
    }));
  };

  const handleMinuteChange = (buttonId, event) => {
    setTimeSettings(prevState => ({
      ...prevState,
      [`minute${buttonId}`]: event.target.value,
    }));
  };

  const handleConfirm = (buttonId) => {
    handleModalClose(buttonId);
  };

  const setAlarm = () => {
    alert("알람이 설정되었습니다.");
  };

  const cancleAlarm = () => {
    alert("알람을 사용하지 않습니다. (설정에서 다시 알람을 다시 설정할 수 있습니다.)");
  };

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
                <h2>시간 설정</h2>
                <div className='setTime'>

                <select value={timeSettings[`ampm${buttonId}`]} onChange={(e) => handleAMPMChange(buttonId, e)}>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
                <input type="number" value={timeSettings[`hour${buttonId}`]} onChange={(e) => handleHourChange(buttonId, e)} min="1" max="12" />
                <span>:</span>
                <input type="number" value={timeSettings[`minute${buttonId}`]} onChange={(e) => handleMinuteChange(buttonId, e)} min="0" max="59" />
                
              </div>
                <button onClick={() => handleConfirm(buttonId)}>확인</button>
                <button onClick={() => handleModalClose(buttonId)}>취소</button>
                </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="text1_info">
        <h1>
          MeddyBaby
        </h1>
      </div>

      <div className="background3">
        <h1></h1>
      </div>

      <div className='button_info3'>
      <div className="alarmset">
        {renderButtonIfTrue(mediData.detail.morning, 1)}
        {renderButtonIfTrue(mediData.detail.afternoon, 2)}
        {renderButtonIfTrue(mediData.detail.evening, 3)}
      </div>

      <div className="confirm">
        <button onClick={setAlarm}>이대로 설정!</button>
      </div>

      <div className="deny">
        <button onClick={cancleAlarm}>알람을 사용하지 않을래요.</button>
      </div>
      </div>

      <div className="navigator">
        <button onClick={dataSave} className="nav-item">다음</button>
      </div>
    </div>
  );
}

export default InfoPage_3;