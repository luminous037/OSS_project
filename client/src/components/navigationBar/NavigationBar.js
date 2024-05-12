
import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // CSS 파일을 임포트합니다.

const NavigationBar = () => {
  return (
    <div className="bottom-nav">
      <Link to="./Start" className="nav-item">홈</Link>
      <Link to="./Main" className="nav-item">집</Link>
      
      
      
    </div>
  );
}

export default NavigationBar;
