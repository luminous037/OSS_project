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
  /*사용 설명창 모둘을 관리*/
  const [isModalOpen, setIsModalOpen] = useState(false);
  /*비를 내린 횟수를 관리*/
  const [rainCount, setRainCount] = useState(0);
  /*시간대를 관리*/
  const [isMorning, setIsMorning] = useState(true);

  useEffect(() => {  //이름 출력
    fetch('/userProfile')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched user data:', data); // 서버에서 받은 데이터 출력
      const userCloud = parseInt(data[0].cloud, 10); // 첫 번째 유저의 cloud 값을 정수로 변환     // 받은 데이터에서 이름만 추출
      setRainCount(userCloud);
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
    })
    .catch(err => {
      console.error('rainUpdate중 오류: ', err);
    });
  };

  useEffect(() => {
    // 페이지가 로드될 때 모달을 자동으로 열고 싶다면 아래 코드 활성화
    setIsModalOpen(true);

    /*시간대에 따라 배경을 다르게 하기 위한 함수*/
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) {
      setIsMorning(true);
    } else {
      setIsMorning(false);
    }
  }, []);

  /*말풍선 대사*/
  const phrases = [
    "안녕!",
    "좋은 하루 보내!",
    "약 먹는 멋진 어린이!",
    "오늘 기분 어때?",
    "만나서 반가워!"
  ];

  /*말풍선 대사 관리*/
  const [currentPhrase, setCurrentPhrase] = useState('');

  useEffect(() => {
    // 대사를 처음 한 번 랜덤으로 설정합니다.
    changePhrase();

    // 5초마다 대사를 랜덤으로 변경합니다.
    const intervalId = setInterval(() => {
      changePhrase();
    }, 5000);

    // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
    return () => clearInterval(intervalId);
  }, []);

  /*말풍선 대사를 랜덤으로 바꿔주는 함수*/
  const changePhrase = () => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setCurrentPhrase(randomPhrase);
  };




  return (
    <div className={`mainpage-all-container ${isMorning ? 'morning-background' : 'night-background'}`}>

      <div className='mainpage-top-container'>
      
        <div className='logo-modal-container'>
        <div className='logo-sun-container'>
        <div class="stack-container">
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
        <div className='sign-container'> 
     </div>
       
        
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
