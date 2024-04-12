import React, { useState } from 'react';

function InfoPage_3() {
  // 각 버튼에 대한 모달 상태를 관리하는 useState 훅
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);

  // 각 버튼의 오전/오후, 시간, 분을 관리하는 useState 훅
  const [ampm1, setAMPM1] = useState('AM');
  const [hour1, setHour1] = useState(9);
  const [minute1, setMinute1] = useState(0);

  const [ampm2, setAMPM2] = useState('PM');
  const [hour2, setHour2] = useState(12);
  const [minute2, setMinute2] = useState(0);

  const [ampm3, setAMPM3] = useState('PM');
  const [hour3, setHour3] = useState(6);
  const [minute3, setMinute3] = useState(0);

  // 각 버튼의 모달 열기/닫기를 위한 함수
  const handleModalOpen1 = () => {
    setModalOpen1(true);
  };

  const handleModalOpen2 = () => {
    setModalOpen2(true);
  };

  const handleModalOpen3 = () => {
    setModalOpen3(true);
  };

  const handleModalClose1 = () => {
    setModalOpen1(false);
  };

  const handleModalClose2 = () => {
    setModalOpen2(false);
  };

  const handleModalClose3 = () => {
    setModalOpen3(false);
  };

  // 각 버튼의 오전/오후를 변경하는 함수
  const handleAMPMChange1 = (event) => {
    setAMPM1(event.target.value);
  };

  const handleAMPMChange2 = (event) => {
    setAMPM2(event.target.value);
  };

  const handleAMPMChange3 = (event) => {
    setAMPM3(event.target.value);
  };

  // 각 버튼의 시간을 변경하는 함수
  const handleHourChange1 = (event) => {
    setHour1(event.target.value);
  };

  const handleHourChange2 = (event) => {
    setHour2(event.target.value);
  };

  const handleHourChange3 = (event) => {
    setHour3(event.target.value);
  };

  // 각 버튼의 분을 변경하는 함수
  const handleMinuteChange1 = (event) => {
    setMinute1(event.target.value);
  };

  const handleMinuteChange2 = (event) => {
    setMinute2(event.target.value);
  };

  const handleMinuteChange3 = (event) => {
    setMinute3(event.target.value);
  };

  // 각 버튼의 모달 확인 버튼을 누를 때 실행되는 함수
  const handleConfirm1 = () => {
    setModalOpen1(false);
  };

  const handleConfirm2 = () => {
    setModalOpen2(false);
  };

  const handleConfirm3 = () => {
    setModalOpen3(false);
  };

  const setAlarm = () => {
    alert("알람이 설정되었습니다.");
  };

  return (
    <div>
        Meddy Baby
        알람 설정
      {/* 첫 번째 버튼 */}
      <button onClick={handleModalOpen1}>
        {`(${ampm1} ${hour1}:${minute1})`}
      </button>
      {modalOpen1 && (
        <div className="modal">
          <div className="modal-content">
            <label>
              <input type="radio" value="AM" checked={ampm1 === 'AM'} onChange={handleAMPMChange1} />
              AM
            </label>
            <label>
              <input type="radio" value="PM" checked={ampm1 === 'PM'} onChange={handleAMPMChange1} />
              PM
            </label>
            <input type="number" value={hour1} onChange={handleHourChange1} /> 시
            <input type="number" value={minute1} onChange={handleMinuteChange1} /> 분
            <button onClick={handleConfirm1}>확인</button>
          </div>
        </div>
      )}

      {/* 두 번째 버튼 */}
      <button onClick={handleModalOpen2}>
        {`(${ampm2} ${hour2}:${minute2})`}
      </button>
      {modalOpen2 && (
        <div className="modal">
          <div className="modal-content">
            <label>
              <input type="radio" value="AM" checked={ampm2 === 'AM'} onChange={handleAMPMChange2} />
              AM
            </label>
            <label>
              <input type="radio" value="PM" checked={ampm2 === 'PM'} onChange={handleAMPMChange2} />
              PM
            </label>
            <input type="number" value={hour2} onChange={handleHourChange2} /> 시
            <input type="number" value={minute2} onChange={handleMinuteChange2} /> 분
            <button onClick={handleConfirm2}>확인</button>
          </div>
        </div>
      )}

      {/* 세 번째 버튼 */}
      <button onClick={handleModalOpen3}>
        {`(${ampm3} ${hour3}:${minute3})`}
      </button>
      {modalOpen3 && (
        <div className="modal">
          <div className="modal-content">
            <label>
              <input type="radio" value="AM" checked={ampm3 === 'AM'} onChange={handleAMPMChange3} />
              AM
            </label>
            <label>
              <input type="radio" value="PM" checked={ampm3 === 'PM'} onChange={handleAMPMChange3} />
              PM
            </label>
            <input type="number" value={hour3} onChange={handleHourChange3} /> 시
            <input type="number" value={minute3} onChange={handleMinuteChange3} /> 분
            <button onClick={handleConfirm3}>확인</button>
          </div>
        </div>
      )}

      알람을 이대로 설정할까요?

      <div>
      <button onClick={setAlarm}>이대로 설정!</button>
    </div>




    </div>
  );
}



export default InfoPage_3;
