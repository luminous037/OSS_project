
import React, { useState, useEffect } from 'react';
import './alarmPage.css';
import chick3 from '../image/chick3.png';




const AlarmPage = () => {

  /*구름 퍼센테이지 관리*/
  const [percentage, setPercentage] = useState(() => {
    /*구름의 퍼센테이지를 로컬저장소에 저장해서 웹페이지를 종료하더라도 저장된 값이 남도록 함*/
    const savedPercentage = localStorage.getItem('cloudPercentage');
    return savedPercentage ? JSON.parse(savedPercentage) : 0;
  });

    // 퍼센테이지 상태가 변경될 때마다 로컬 스토리지에 저장
    useEffect(() => {
      localStorage.setItem('cloudPercentage', JSON.stringify(percentage));
    }, [percentage]);

    /*clear 버튼을 누를 경우 퍼센테이지가 35씩 증가한다. 최대 100*/
    const handleClearClick = () => {
      setPercentage(prev => Math.min(prev + 35, 100));
    };

    const textStyle = {
        fontSize: '40px', 
        fontFamily: 'on', 
        color: '#5B5859', 
      };

  return (
    <div className="alarm-container">

      <div className="top-container">
      <div className="animated-circle"> 
      <img src={chick3} alt="chick3" className="chick3" />
      <div className='wirting-box'>
      <div className="writing" style={textStyle}>약 먹을 시간이에요!</div>
      </div>
        </div>
      </div>
      

      <div className="middle-container">
      <button className="close-button" onClick={handleClearClick}>clear!</button>
      </div>
      
      <div className="bottom-container">
    
      </div>
    </div>
  );
};

export default AlarmPage;

