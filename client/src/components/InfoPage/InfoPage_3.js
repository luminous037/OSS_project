import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom'; // useParams 추가
import "./InfoPage_3.css"
import InfoPage_2 from './InfoPage_2';


function InfoPage_3() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id'); // 쿼리 파라미터로부터 id 값을 가져옴


const navigate=useNavigate();

const [mediData, setMediData] = useState({
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

const fetchData = () => { //데이터 저장
    fetch(`http://localhost:4000/addAlarm${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ current: '', updated: timeSettings}) //알람 시간 업데이트
    })
    .then(() => {
      navigate('/Main'); // 저장 후 페이지 이동
    })
    .catch(err => {
        console.error('fetchData 중 오류: ', err);
    });
};


useEffect(() => { //이전 약 정보 불러옴
  const fetchData = async () => {
    try {
      const res = await callApi(); //
      if (Array.isArray(res) && res.length > 0) {
        setMediData(res[0]); // 배열의 첫 번째 요소를 사용
      } else {
        setMediData(res);
      }
    } catch (err) {
      console.log("클라이언트에서 약 불러오기 중: ", err);
    }
  };

  fetchData();
}, [id]);

const callApi = async () => {
  const response = await fetch(`http://localhost:4000/list/${id}`);
  const body = await response.json();
  return body;
};

  const [modalState, setModalState] = useState({
    modalOpen1: false,
    modalOpen2: false,
    modalOpen3: false,
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
      <div className="text1">
        <h1>
          MeddyBaby
        </h1>
      </div>

      <div className="background3">
        <h1></h1>
      </div>

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

      <div className="navigator">
        <button onClick={fetchData} className="nav-item">다음</button>
      </div>
    </div>
  );
}

export default InfoPage_3;