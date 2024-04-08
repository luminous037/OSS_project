// 예: src/pages/StartPage.js
import React from 'react';
import './Start.css';
import chick from './chick.png'; // 병아리 이미지 경로에 맞게 수정하세요.

function Start() {
  return (
    <div className="start-page">
      <img src={chick} alt="chick" className="chick-animation" />
    </div>
  );
}

export default Start;
