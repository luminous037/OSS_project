import React, { useState, useEffect } from 'react';
import './cloud.css';
import cloudImage from '../image/cloud3.png';



function Cloud({ onRain }) {
    /*구름 퍼센테이지 관리*/
    const [percentage, setPercentage] = useState(() => {
       /*구름의 퍼센테이지를 로컬저장소에 저장해서 웹페이지를 종료하더라도 저장된 값이 남도록 함*/
        const savedPercentage = localStorage.getItem('cloudPercentage');
        return savedPercentage ? JSON.parse(savedPercentage) : 0;
      });
    /* 위의 똑같은 내용이 alarmPage.js에도 있는데 알람페이지에서 clear를 눌렀을 경우에도 구름 퍼센테이지가 저장되게 하기위해서*/
      
  // 퍼센테이지 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('cloudPercentage', JSON.stringify(percentage));
  }, [percentage]);

  /*구름을 클릭했을 경우 퍼센테이지가 상승함 최대 100*/
  const handleClearClick = () => {
    setPercentage(prev => Math.min(prev + 35, 100));
  };


  /*퍼센테이지가 100%가 되었을 때 구름을 클릭했을 경우 발생하는 상황들*/
  const handleCloudClick = () => {
    if (percentage === 100) {
      const cloudElement = document.querySelector('.cloud');
      /*비가 내리는 애니메이션이 나타남*/
      cloudElement.classList.add('rain-animation');
      setTimeout(() => {
        /*비가 내리는 애니메이션이 없어짐*/
        cloudElement.classList.remove('rain-animation');
        /*퍼센테이지를 0으로 초기화함*/
        setPercentage(0);
        onRain();
      }, 3000); // 애니메이션 지속 시간과 일치하도록 설정
    }
  };


  return (
    <div className="App">
      <button className="what" onClick={handleClearClick}>✨ Have a nice day ✨</button>
      <div className="cloud" onClick={handleCloudClick}>
        <img src={cloudImage} alt="Cloud" />
        <div className="cloud-percentage">{percentage}%</div> 
      </div>
    </div>
  );

}

export default Cloud;