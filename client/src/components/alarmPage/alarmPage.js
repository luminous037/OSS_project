
import React, { useState, useEffect } from 'react';
import './alarmPage.css';
import chick3 from '../image/chick3.png';




const AlarmPage = () => {

  /*구름 퍼센테이지 관리하는 함수*/
  const [percentage, setPercentage] = useState(() => {
  });

  useEffect(() => {
    fetch('/userProfile')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched user data:', data); // 서버에서 받은 데이터 출력
      const userCloud = parseInt(data[0].cloud, 10);
      setPercentage(userCloud);
    })
    .catch(error => {
        console.error('유저 정보를 가져오는 중 에러:', error);
    });
  }, []);

  /*구름을 클릭했을 경우 퍼센테이지가 상승함 최대 100*/
  const handleClearClick = () => {
    setPercentage(prev =>{
      const newPercent=Math.min(prev + 35, 100)
      updateCloud(newPercent);
      return newPercent;
    });
  };

  const updateCloud = (newPercent) => {
    fetch(`http://localhost:4000/cloudUpdate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(({ cloudPercent: newPercent }))
    })
    .then(() => {
    })
    .catch(err => {
      console.error('rainUpdate중 오류: ', err);
    });
  };

    /*구름 퍼센테이지 텍스트 css*/
    const textStyle = {
        fontSize: '40px', 
        fontFamily: 'on', 
        color: '#5B5859', 
      };

      /*AlarmPage를 임포트 했을 경우 return되는 요소들*/
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

