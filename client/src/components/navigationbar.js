import React from 'react';
import './navigationbar.css'; // CSS 파일 위치에 맞게 경로를 조정해주세요.

function BottomNavigationBar() {
  return (
    <div className="bottom-nav">
      <a href="./Start.js" className="bottom-nav-item">
        Home
      </a>
      {/* <a href="#" className="bottom-nav-item">
        Search
      </a>
      <a href="#" className="bottom-nav-item">
        Profile
      </a> */}
    </div>
  );
}

export default BottomNavigationBar;