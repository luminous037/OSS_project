import React, { useState } from 'react';
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

  return (
    <div>
      <div className="navigator">
        <Link to="./Main" className="nav-item">이전</Link>
      </div>

      <div className="title">
        <h1>칭찬스티커</h1>
      </div>

      <div className="Images">
        <div className="background">
          <h1></h1>
        </div>

        <div className="pannelImage">
          <img src={pannel} className="pannel" />
        </div>

        <div className="chick1">
          <img src={chick1} className="chick1" />
        </div>
        <div className="chick2">
          <img src={chick2} className="chick2" />
        </div>
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
