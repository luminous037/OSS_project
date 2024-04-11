
// import React from 'react';
// import './Start.css';
// import chick from './chick.png'; // 병아리 이미지 경로에 맞게 수정하세요.

// function Start() {
//   const startX = Math.random()*window.innerWidth;
//   return (
//     <div className="drop" style={{left:startX}}></div>,
//     <div className="start-page">
//       <img src={chick} alt="chick" className="chick-animation" />
//     </div>
//   );
// }

// export default Start;

import React, { useState, useEffect } from 'react';
import './Start.css';
import chick from './chick.png'; // 병아리 이미지 경로에 맞게 수정하세요.

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
      {drops}
      <img src={chick} alt="chick" className="chick-animation" />
    </div>
  );
}

export default Start;

