import React, { useState, useEffect } from 'react';
import './alarmPage.css';
import chick3 from '../image/chick3.png';
import { useNavigate } from 'react-router-dom';
import music from "./meddy_baby_ver3.mp3";

const AlarmPage = () => {
  const [percentage, setPercentage] = useState(0);
  const navigate = useNavigate();
  const audio = new Audio(music); // 오디오 객체 생성

  useEffect(() => {
    fetch('/userProfile')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched user data:', data);
        const userCloud = parseInt(data[0].cloud, 10);
        setPercentage(userCloud);
      })
      .catch(error => {
        console.error('유저 정보를 가져오는 중 에러:', error);
      });

    audio.play().catch(err => console.log("오디오 재생 오류:", err)); // 컴포넌트가 마운트될 때 오디오 재생
  }, []);

  const handleClearClick = () => {
    setPercentage(prev => {
      const newPercent = Math.min(prev + 35, 100);
      updateCloud(newPercent);
      audio.pause();
      audio.currentTime = 0;
      navigate('/Main');
      return newPercent;
    });
  };

  const updateCloud = (newPercent) => {
    fetch(`http://localhost:4000/cloudUpdate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cloudPercent: newPercent })
    })
    .catch(err => {
      console.error('rainUpdate중 오류: ', err);
    });
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
      <div className="bottom-container"></div>
    </div>
  );
};

export default AlarmPage;
