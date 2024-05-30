import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom'; // useParams 추가
import "./InfoPage_3.css"
import InfoPage_2 from './InfoPage_2';


function InfoPage_3() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mediID = searchParams.get('mediID'); // 쿼리 파라미터로부터 id 값을 가져옴
  const userID = searchParams.get('userID'); // 쿼리 파라미터로부터 id 값을 가져옴

  const navigate=useNavigate();
  const navigateBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };


const [alarm, setalarm] = useState(false);

const [mediData, setMediData] = useState({ //기존에 저장된 detail 값 필요
  mediName: '',
  time: {},
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

const updateAlarm = () => { //알람 시간 저장을 위한 fetch
    fetch(`http://localhost:4000/addAlarm`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mediID, userID, time: timeSettings, alarm })
    })
    .then(() => {
      console.log(timeSettings);
      navigate('/Main'); // 저장 후 페이지 이동
    })
    .catch(err => {
        console.error('fetchData 중 오류: ', err);
    });
};

useEffect(() => {
  console.log(alarm);
}, [alarm]); // alarm 상태가 변경될 때마다 호출

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
}, [mediID]);

const callApi = async () => {
  const response = await fetch(`http://localhost:4000/list/${mediID}`);
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
    setalarm(true);
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
    <div>
      <div className='title_info'>
        MeddyBaby
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

      </div>

      <div className="navigator">
        <button onClick={updateAlarm} className="nav-item">다음</button>
      </div>
      <div className='navigator-back'>
      <button onClick={navigateBack}>이전</button>
      </div>
    </div>
  );
}

export default InfoPage_3;