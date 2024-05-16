import React, { useState, useEffect } from 'react';
import InstructionModal from './Guidebook.js';
import './Main.css';
import Cloud from './cloud.js';
import Seed from './seed.js';




const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rainCount, setRainCount] = useState(0);

  const handleRain = () => {
    setRainCount(prevCount => prevCount + 1);
  };

  useEffect(() => {
    // 페이지가 로드될 때 모달을 자동으로 열고 싶다면 아래 코드 활성화
    setIsModalOpen(true);
  }, []);

  return (
    <div className='mainpage-all-container'>

      <div className='mainpage-top-container'>
        <div className='logo-modal-container'>
        <div className='logo-sun-container'>
        <h1>메인 페이지</h1>
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
        <div className='bench-container'>bench</div>
      </div>

          
          <div className='mainpage-bottom-container'>
        <div className='seed-container'>
        <div className="App">
      <Cloud onRain={handleRain} />
      <Seed rainCount={rainCount} />
    </div>
        </div>
        <div className='sign-container'> sign</div>
       
        
      </div>

      <div className='chick-conainer'>chick</div>



    </div>
  );
};

export default MainPage;
