import React, { useState, useEffect } from 'react';
import InstructionModal from './Guidebook.js';
import './Main.css';
import Cloud from './cloud.js';
import Seed from './seed.js';
import moon from '../image/moon.png';
import sun from '../image/sun.png';
import bench from '../image/bench.png';


const MainPage = () => {
  /*사용 설명창 모둘을 관리*/
  const [isModalOpen, setIsModalOpen] = useState(false);
  /*비를 내린 횟수를 관리*/
  const [rainCount, setRainCount] = useState(0);
  /*시간대를 관리*/
  const [isMorning, setIsMorning] = useState(true);

  /*비 내린 횟수를 계산하는 함수*/
  const handleRain = () => {
    setRainCount((prevCount) => prevCount + 1);
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

  return (
    <div className={`mainpage-all-container ${isMorning ? 'morning-background' : 'night-background'}`}>

      <div className='mainpage-top-container'>
      <Cloud onRain={handleRain} />
        <div className='logo-modal-container'>
        <div className='logo-sun-container'>
        <div class="stack-container">
        <h1>Meddy Baby</h1>
        </div>
        <img src={isMorning ? sun : moon} alt={isMorning ? "sun" : "moon"} className="sun" />
        </div>
        
        <button className="button-hover" onClick={() => setIsModalOpen(true)}>사용 설명 보기</button>
        </div>
        <div className='cloud-container'>
          
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
        <div className="App">
      

      <Seed rainCount={rainCount} setRainCount={setRainCount} />
    </div>
        </div>
        <div className='sign-container'> sign</div>
       
        
      </div>

      <div className='chick-conainer'>chick</div>



    </div>
  );
};

export default MainPage;
