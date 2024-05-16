import React, { useState, useEffect } from 'react';
import './Start.css';
import chick from '../image/chick.png';
import puddle from '../image/puddle.png';
import pill1 from '../image/pill1.png';
import pill2 from '../image/pill2.png';
import jam from '../image/jam.png';
import flower from '../image/flower.png';

function Start() {
  const [state, setState] = useState({
    visiblePills: [],
    visibleLetters: []
  });

  useEffect(() => {
    let vh = 0;
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    const pillImages = [pill1, pill2, jam, flower];
    let delay = 0;

    const text = 'Meddy\nBaby';

    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        setState((currentState) => ({
          ...currentState,
          visibleLetters: [...currentState.visibleLetters, text[i] === '\n' ? <br key={i}/> : <span key={i}>{text[i]}</span>]
        }));
      }, 1000 + delay);
      delay += 200; // 500ms의 지연 시간을 각 글자에 적용
    }

    pillImages.forEach((pill, index) => {
      setTimeout(() => {
        setState((currentState) => ({
          ...currentState,
          visiblePills: [...currentState.visiblePills, <img key={index} src={pill} alt={`pill${index+1}`} className={`pill${index+1}`} style={{position: 'absolute', left: `${15 + 20*index}%`, bottom: '30%', width: '40px', height: '40px'}}/>]
        }));
      }, 1000 + delay);
      delay += 500; // 이미지를 1초 간격으로 표시
    });

  }, []);

  return (
    <div className="start-page">
      <div className="top-section">
        <div className="puddle-top-box"></div>
        <img src={puddle} alt="puddle" className="puddle-animation" />
        <div className="ocean">
          <div className="wave"></div>
        </div>
      </div>

      <div className="middle-section">
        <div className="logo">{state.visibleLetters}</div>
        {state.visiblePills}
      </div>

      <div className="bottom-section">
        <img src={chick} alt="chick" className="chick" />
      </div>
    </div>
  );
}

export default Start;
