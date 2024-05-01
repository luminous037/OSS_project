
import React, { useState, useEffect } from 'react';
import './Start.css';
import chick from './chick.png';
import puddle from './puddle.png';
import pill1 from './pill1.png';
import pill2 from './pill2.png';
import jam from './jam.png';
import flower from './flower.png';



function Start() {
  const [visiblePills, setVisiblePills] = useState([]);

  useEffect(() => {
    let vh = 0;
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    const pillImages = [pill1, pill2, jam,flower]; // 이 배열에 필요한 만큼 알약 이미지를 추가하세요.
    let delay = 0;
    
    pillImages.forEach((pill, index) => {
      setTimeout(() => {
        setVisiblePills((currentPills) => [...currentPills, <img key={index} src={pill} alt={`pill${index+1}`} className={`pill${index+1}`} style={{position: 'absolute', left: `${15 + 20*index}%`, bottom: '30%', width: '40px', height: '40px'}}/>]);
      }, 1000 + delay); // 1초 간격으로 알약 이미지가 나타납니다.
      delay += 1000; // 다음 알약 이미지가 나타나기까지의 시간 간격을 조정합니다.
    });
    
  }, []);

  

  return (
    
    <div className="start-page">
      <div className="top-section">
      <div class="puddle-top-box"></div>
      <img src={puddle} alt="puddle" className="puddle-animation" />
      <div className="ocean">
      <div className="wave"></div>
    </div>

    
      </div>
      <div className="middle-section">
      <div className="logo">Meddy Baby</div>

      {visiblePills}
      </div>
      
      
      <div className="bottom-section">
      
      <img src={chick} alt="chick" className="chick" />
      </div>
    </div>
    
  );
}

export default Start;

