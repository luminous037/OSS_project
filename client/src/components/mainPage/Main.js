import React, { useState, useEffect } from 'react';
import InstructionModal from './Guidebook.js';
import './Main.css';
import Cloud from './cloud.js';
import Seed from './seed.js';
import PresentCheckModal from './present_check.js'; // 출석체크 모달 컴포넌트 임포트
import moon from '../image/moon.png';
import sun from '../image/sun.png';
import bench from '../image/bench.png';
import star from '../image/star.png';
import cloud5 from '../image/cloud5.png';
import chicken from '../image/chicken.png';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rainCount, setRainCount] = useState(null);
  const [isMorning, setIsMorning] = useState(true);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false); //출석확인 모달창
  const [isAttendanceChecked, setIsAttendanceChecked] = useState(false); //출석 상태 확인
  const [presentCount, setPresentCount] = useState(0); // 출석 횟수 상태 추가

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

    // 로컬스토리지에서 출석상태를 저장 (출석 후 하루동안 안띄우기 위해)
    const lastAttendanceCheck = localStorage.getItem('lastAttendanceCheck');
    if (lastAttendanceCheck) {
      const now = new Date();
      const lastCheckDate = new Date(lastAttendanceCheck);
      const timeDifference = now - lastCheckDate;
      const hoursDifference = timeDifference / (1000 * 60 * 60);

      // 24시간동안 버튼 비활성화
     if (hoursDifference < 24) {
        setIsAttendanceChecked(true);
      }
    }
  }, []);

  useEffect(() => {
    if (rainCount === null) return;
    else updateRain(rainCount);
  }, [rainCount]);

  const handleRain = () => {
    if (rainCount >= 4) {
      setRainCount(0);
      updateRain(0);
    }
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

  const presentCheck = (newCount) => { 
    fetch(`http://localhost:4000/presentUpdate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(({ presentCount: newCount }))
    })
      .then(() => {
        console.log('present count updated');
        console.log(newCount);
      })
      .catch(err => {
        console.error('presentUpdate중 오류: ', err);
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

    // 출석 체크 모달창을 설정
    const lastAttendanceCheck = localStorage.getItem('lastAttendanceCheck');
    if (!lastAttendanceCheck || new Date() - new Date(lastAttendanceCheck) > 24 * 60 * 60 * 1000) {
      setIsAttendanceModalOpen(true);
    }
  }, []);

  const handleAttendanceCheck = () => {
    setIsAttendanceChecked(true); //출석 체크 버튼이 비활성화되도록 하며, 사용자가 이미 출석 체크를 완료했음.
    setIsAttendanceModalOpen(false);
    setPresentCount(presentCount + 1);
    presentCheck(1);
    localStorage.setItem('lastAttendanceCheck', new Date().toISOString());
  };

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
      <PresentCheckModal 
        isOpen={isAttendanceModalOpen} 
        onClose={() => setIsAttendanceModalOpen(false)}
        onPresentCheck={handleAttendanceCheck}
      />
    </div>
  );
};

export default MainPage;
