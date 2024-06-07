import React, { useState, useEffect } from 'react';
import './alarmPage.css';
import chick3 from '../image/chick3.png';
import { useNavigate } from 'react-router-dom';
import backgroundMusic from '../music/meddy_baby_ver3.mp3';

const AlarmPage = () => {
  const [percentage, setPercentage] = useState(() => {});
  const navigate = useNavigate();
  const [audio] = useState(new Audio(backgroundMusic));
  const [isPlaying, setIsPlaying] = useState(false);

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

    // PWA에서 자동 재생
    const isInStandaloneMode = () => (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone ||
      window.location.search.includes('utm_source=homescreen')
    );

    if (isInStandaloneMode()) {
      audio.play().catch(error => {
        console.log('Audio play was prevented:', error);
      });
      setIsPlaying(true);
    }


    // 클린업: 컴포넌트가 언마운트될 때 오디오 중지 및 이벤트 제거
    return () => {
      audio.pause();
      audio.currentTime = 0; // 오디오를 처음으로 리셋
    };
  }, [audio]);

  const handleClearClick = () => {
    setPercentage(prev => {
      const newPercent = Math.min(prev + 35, 100);
      updateCloud(newPercent);
      navigate('/Main');

      // 버튼 클릭 시 배경 음악 중지
      audio.pause();
      audio.currentTime = 0;

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

  useEffect(() => {
    const isInStandaloneMode = () => (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone ||
      window.location.search.includes('utm_source=homescreen')
    );
  
    const isAlarmSet = localStorage.getItem('isAlarmSet'); // 로컬 스토리지에서 알람 설정 값을 가져옴
  
    if (isInStandaloneMode() && isAlarmSet) { // 알람이 설정되어 있고, PWA에서 실행 중인 경우에만 음악을 재생
      audio.play().catch(error => {
        console.log('Audio play was prevented:', error);
      });
      setIsPlaying(true);
    }
  
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  /*AlarmPage를 임포트 했을 경우 return되는 요소들*/
  return (
    <div className="alarm-container">
      <div className="top-container">
        <div className="animated-circle">
          <img src={chick3} alt="chick3" className="chick3" />
          <div className='writing-box'>
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