import React, { useState, useEffect } from 'react';
import './Start.css';
import chick from './chick.png';
import puddle from './puddle.png';


function Drop() {
  const startX = Math.random() * window.innerWidth;
  return (
    <div className="drop" style={{ left: startX }}></div>
  );
}

function Start() {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrops(drops => [...drops, <Drop key={drops.length} />]);
    }, 1000); // 1초마다 새로운 물방울 생성

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  return (
    <div className="start-page">
      <img src={puddle} alt="puddle" className="puddle-animation" />
      <div className="logo">Meddy Baby</div>
      {drops}
      <img src={chick} alt="chick" className="chick" />
    </div>
  );
}

export default Start;

