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
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [stampStatusValue, setStampStatusValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [userID, setUserID] = useState();
  const [addPoint, setAddPoint] = useState ();

  useEffect(() => {
    fetch('http://localhost:4000/userProfile')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched user data:', data);
        const stampStatusValue = data[0].stamp;
        const userId = data[0].user_id;
        const points = data[0].points;
        const newStampStatus = {};
        if (stampStatusValue !== 0) {
          for (let i = 1; i <= stampStatusValue; i++) {
            newStampStatus[i] = true;
          }
        }
        setAddPoint(points);
        setStampStatus(newStampStatus);
        setStampStatusValue(stampStatusValue);
        setUserID(userId);
      })
      .catch(error => {
        console.error('유저 정보를 가져오는 중 에러:', error);
      });
  }, [stampStatusValue, stampStatus]);

  useEffect(() => {
    if (stampStatusValue === 5) {
      setShowModal(true);
    }
  }, [stampStatusValue]);

  const showExplosionAnimation = () => {
    const explodeAnimation = document.createElement('div');
    explodeAnimation.classList.add('explode-animation');
    document.body.appendChild(explodeAnimation);
    setTimeout(() => {
      explodeAnimation.remove();
    }, 1100);
  };

  const setPoint = (newP) => {
    fetch('http://localhost:4000/givePoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ points : newP }) 
    })
      .then(response => response.json())
      .catch(err => {
        console.error('포인트 부여 오류: ', err);
      });
  }

  const givePoint =() => {
    const newpoint = addPoint + 500 ;
    setPoint(newpoint);
  }

  const resetStamp = () => {
    fetch('http://localhost:4000/stampUpdate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ stampCount : 0 , userID}) // stamp를 0으로 설정
    })
      .then(response => response.json()) // 서버 응답을 JSON으로 파싱
      .then(data => {
        console.log('reset Stamp 성공:', data);
        setStampStatus({
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
        });
        setStampStatusValue(0);
      })
      .catch(err => {
        console.error('스탬프 리셋중 오류: ', err);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    resetStamp();
    showExplosionAnimation();
    givePoint();
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

      <div className="stamp-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', transform: 'translateY(220px)' }}>
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
            <img src={stampStatus[index] ? stamp : unstamped} alt={`Stamp ${index}`} style={{ width: '120px', padding: '0' }} />
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
