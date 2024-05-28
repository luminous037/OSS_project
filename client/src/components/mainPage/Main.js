import React, { useState, useEffect } from 'react';
import InstructionModal from './Guidebook.js';
import './Main.css';
import Cloud from './cloud.js';
import Seed from './seed.js';
import moon from '../image/moon.png';
import sun from '../image/sun.png';
import bench from '../image/bench.png';
import star from '../image/star.png';
import cloud5 from '../image/cloud5.png';
import chicken from '../image/chicken.png';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rainCount, setRainCount] = useState(0);
  const [isMorning, setIsMorning] = useState(true);

  useEffect(() => {
    fetch('/userProfile')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched user data:', data); // 서버에서 받은 데이터 출력
        const userRain = parseInt(data[0].rain, 10); // 정수로 변환  
        setRainCount(userRain);
      })
      .catch(error => {
        console.error('유저 정보를 가져오는 중 에러:', error);
      });
  }, []);

  const handleRain = () => {
    setRainCount((prevCount) => {
      const newCount = prevCount + 1;
      updateRain(newCount);
      return newCount;
    });
    console.log(rainCount);
  };

  const updateRain = (newCount) => {
    fetch(`http://localhost:4000/rainUpdate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(({ rainCount: newCount }))
    })
      .then(() => {
        console.log('Rain count updated');
      })
      .catch(err => {
        console.error('rainUpdate중 오류: ', err);
      });
  };

  useEffect(() => {
    setIsModalOpen(true);

    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) {
      setIsMorning(true);
    } else {
      setIsMorning(false);
    }
  }, []);

  const phrases = [
    "안녕!",
    "좋은 하루 보내!",
    "약 먹는 멋진 어린이!",
    "오늘 기분 어때?",
    "만나서 반가워!"
  ];

  const [currentPhrase, setCurrentPhrase] = useState('');

  useEffect(() => {
    changePhrase();
    const intervalId = setInterval(() => {
      changePhrase();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const changePhrase = () => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setCurrentPhrase(randomPhrase);
  };

  return (
    <div className={`mainpage-all-container ${isMorning ? 'morning-background' : 'night-background'}`}>
      <div className='mainpage-top-container'>
        <div className='logo-modal-container'>
          <div className='logo-sun-container'>
            <div className="stack-container">
              <h1>Meddy Baby</h1>
            </div>
            <img src={isMorning ? sun : moon} alt={isMorning ? "sun" : "moon"} className="sun" />
          </div>
          <img src={isMorning ? cloud5 : star} alt={isMorning ? "cloud4" : "star"} className="star" />
        </div>
        <img src={isMorning ? cloud5 : star} alt={isMorning ? "cloud5" : "star"} className="star1" />
        <div className='cloud-container'>
          <Cloud onRain={handleRain} />
          <img src={isMorning ? cloud5 : star} alt={isMorning ? "cloud5" : "star"} className="star3" />
        </div>
      </div>
      <div className='first-container'>
        <InstructionModal isOpen={isModalOpen} close={() => setIsModalOpen(false)} />
      </div>
      <div className='mainpage-middle-container'>
        <div className='bench-container'>
          <img src={bench} alt="bench" className="bench" />
        </div>
      </div>
      <div className='mainpage-bottom-container'>
        <div className='seed-container'>
          <Seed rainCount={rainCount} setRainCount={setRainCount} />
        </div>
        <div className='sign-container'></div>
      </div>
      <div className='chick-conainer'>
        <img src={chicken} alt="chicken" className="chicken" />
        <div className="balloon">
          <p>{currentPhrase}</p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
