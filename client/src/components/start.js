import React from 'react';
import './Start.css'; //css 파일 임포트
import './App.css';
import chickimage from './chick.png'; //병아리 이미지 임포트



function Start() {
    return(
        <div>
            <nav>
                <div className="nav-wrapper">
                    <div> do it!</div>
                </div>
                <div className="chick-container">
                    <img src={chickimage} alt="병아리"/>
                </div>
 
            </nav>
        </div>
    );
}

export default Start;