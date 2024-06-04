import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './WeeklyPage.css';
import pannel from '../image/pannel.png';
import chick1 from '../image/chick1.png';
import chick2 from '../image/chick2.png';
import unstamped from '../image/unstamped.png';
import stamp from '../image/stamp.png';

function WeeklyCheck() {
  const [stampStatus, setStampStatus] = useState({
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
  });

  const [showModal, setShowModal] = useState(false);

  /*폭죽*/
  const showExplosionAnimation = () => {
    const explodeAnimation = document.createElement('div');
    explodeAnimation.classList.add('explode-animation');
    document.body.appendChild(explodeAnimation);
    setTimeout(() => {
      explodeAnimation.remove();
    }, 1100);
  };

  const handleInputChange = (index, value) => {
    const newStampStatus = { ...stampStatus, [index]: value === '1' };
    setStampStatus(newStampStatus);

    // 모든 스탬프가 선택되었는지 확인합니다
    const allStamped = Object.values(newStampStatus).every(status => status === true);
    if (allStamped) {
      setShowModal(true);
      showExplosionAnimation();
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const phrases = [
    "잘했어!",
    "스티커 모으기!",
    "약 먹는 멋진 어린이!",
    "너 진짜 멋진걸?",
    "짱이다!"
  ];

  const [currentPhrase, setCurrentPhrase] = useState('');

  useEffect(() => {
    changePhrase();
    const intervalId = setInterval(() => {
      changePhrase();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const changePhrase = () => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setCurrentPhrase(randomPhrase);
  };

  return (
    <div>
      <div className="navigator">
        <Link to="./Main" className="nav-item">이전</Link>
      </div>

      <div className="title_weekly">
        칭찬스티커
      </div>

      <div className="Images">
        <div className="background">
          <h1></h1>
        </div>

        <div className="pannel_image">
          <img src={pannel} className="pannel_weekly" />
        </div>

        <div className="chick1">
          <img src={chick1} className="chick1" />
        </div>
        <div className="chick2">
          <img src={chick2} className="chick2" />
        </div>
      </div>

      <div className="balloon_weekly">
        <p>{currentPhrase}</p>
      </div>

      <div className="input" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', transform: 'translateY(200px)' }}>
        {[1, 2, 3, 4, 5].map(index => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '6px',
            }}
          >
            <img src={stampStatus[index] ? stamp : unstamped} alt={`Image ${index}`} style={{ width: '90px', padding: '0' }} />
            <input
              type="text"
              value={stampStatus[index] ? '1' : ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
              style={{ width: '50px',
               textAlign: 'center'
              }}
            />
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-get-point">
            <h2>다 모았다! <br />포인트 획득!</h2>
            <button onClick={closeModal}>획득</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeeklyCheck;
