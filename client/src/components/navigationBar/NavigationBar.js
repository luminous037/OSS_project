
import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // CSS 파일을 임포트합니다.

const NavigationBar = () => {
  return (
    <div className="bottom-nav">
      <Link to="./Start" className="nav-item">시작</Link>
      <Link to="./Main" className="nav-item">홈</Link>
      <Link to="./Alarm" className="nav-item">알람창</Link>
      <Link to="./Shop" className="nav-item">상점</Link>
      <Link to="./MyPage" className="nav-item">설정</Link>
      
      
      
      
    </div>
  );
}

export default NavigationBar;
