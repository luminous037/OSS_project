import React from 'react';
import './alarmPage.css';
import chick3 from '../image/chick3.png';



const AlarmPage = () => {

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
      <button className="close-button">clear!</button>
      </div>
      
      <div className="bottom-container">
    
      </div>
    </div>
  );
};

export default AlarmPage;

