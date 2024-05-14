import React from 'react';
import './alarmPage.css';
import chick2 from '../image/chick2.png';

const AlarmPage = () => {
  return (
    <div className="alarm-container">

      <div className="top-container">
      <div className="animated-circle"> 
      <img src={chick2} alt="chick2" className="chick2" />
        </div>
      </div>
      

      <div className="middle-container">
        
      </div>
      
      <div className="bottom-container">
      </div>
    </div>
  );
};

export default AlarmPage;

