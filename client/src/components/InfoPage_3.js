import React, { useState } from 'react';

function InfoPage_3() {
  const [ampm, setAMPM] = useState('AM'); // 초기값은 오전
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const handleAMPMChange = (event) => {
    setAMPM(event.target.value);
  };

  const handleHourChange = (event) => {
    setHour(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setMinute(event.target.value);
  };

  return (
    <div>

        Meddy Baby
        알람 설정
        
      <div>
        <label>
          <input type="radio" value="AM" checked={ampm === 'AM'} onChange={handleAMPMChange} />
          오전
        </label>
        <label>
          <input type="radio" value="PM" checked={ampm === 'PM'} onChange={handleAMPMChange} />
          오후
        </label>
      </div>
      <div>
        <input type="number" value={hour} onChange={handleHourChange} /> 시
        <input type="number" value={minute} onChange={handleMinuteChange} /> 분
      </div>
    </div>
  );
}

export default InfoPage_3