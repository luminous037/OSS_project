import React, { useState, useEffect } from 'react';
import './cloud.css';

function Cloud({ onRain }) {
    /*구름 퍼센테이지 관리*/
    const [percentage, setPercentage] = useState(() => {
        const savedPercentage = localStorage.getItem('cloudPercentage');
        return savedPercentage ? JSON.parse(savedPercentage) : 0;
      });
    
      
  // 퍼센테이지 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('cloudPercentage', JSON.stringify(percentage));
  }, [percentage]);

  const handleClearClick = () => {
    setPercentage(prev => Math.min(prev + 35, 100));
  };


  const handleCloudClick = () => {
    if (percentage === 100) {
      const cloudElement = document.querySelector('.cloud');
      cloudElement.classList.add('rain-animation');
      setTimeout(() => {
        cloudElement.classList.remove('rain-animation');
        setPercentage(0);
        onRain();
      }, 3000); // 애니메이션 지속 시간과 일치하도록 설정
    }
  };


  return (
    <div className="App">
      <button onClick={handleClearClick}>Clear</button>
      <div className="cloud" onClick={handleCloudClick}>
        ☁️ {percentage}%
      </div>
    </div>
  );

}

export default Cloud;