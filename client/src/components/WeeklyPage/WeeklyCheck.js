import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './WeeklyPage.css';
import pannel from '../image/pannel.png';
import chick1 from '../image/chick1.png';
import chick2 from '../image/chick2.png';
import unstamped from '../image/unstamped.png';
import stamp from '../image/stamp.png';

function WeeklyCheck() {
  const [days, setDays] = useState(0);
  const [inputFields, setInputFields] = useState([]);

  

  const handleDaysChange = (e) => {
    const value = e.target.value;
    setDays(value);
    updateInputFields(value);
  };

  const updateInputFields = (numDays) => {
    const newInputFields = [];
    for (let i = 0; i < numDays; i++) {
      newInputFields.push({ id: i });
    }
    setInputFields(newInputFields);
  };

  const handleInputChange = (index, value) => {
    const newInputFields = [...inputFields];
    newInputFields[index].imageSrc = value === '1' ? stamp : unstamped;
    setInputFields(newInputFields);
  };

    /*말풍선 대사*/
    const phrases = [
      "잘했어!",
      "스티커 모으기!",
      "약 먹는 멋진 어린이!",
      "너 진짜 멋진걸?",
      "짱이다!"
    ];
  
    /*말풍선 대사 관리*/
    const [currentPhrase, setCurrentPhrase] = useState('');
  
    useEffect(() => {
      // 대사를 처음 한 번 랜덤으로 설정합니다.
      changePhrase();
  
      // 5초마다 대사를 랜덤으로 변경합니다.
      const intervalId = setInterval(() => {
        changePhrase();
      }, 5000);
  
      // 컴포넌트가 언마운트될 때 인터벌을 정리합니다.
      return () => clearInterval(intervalId);
    }, []);
  
    /*말풍선 대사를 랜덤으로 바꿔주는 함수*/
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

      <div className="howMuchStamp">
        <input
          type="number"
          value={days}
          onChange={handleDaysChange}
          min="0"
          style={{ width: '50px', textAlign: 'center' }}
        />
      </div>

      <div className="input" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', transform: 'translateY(200px)' }}>
        {inputFields.map((field, index) => (
          <div
            key={field.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '6px',
            }}
          >
            <img src={field.imageSrc} alt={`Image ${index + 1}`} style={{ width: '90px', padding: days <= 4 ? '50px' : '0' }} />
            <input
              type="text"
              value={field.imageSrc === unstamped ? '' : '1'} // value 값이 입력되지 않은 경우 빈 문자열로 설정
              onChange={(e) => handleInputChange(index, e.target.value)}
              style={{ width: '50px', textAlign: 'center' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default WeeklyCheck;
