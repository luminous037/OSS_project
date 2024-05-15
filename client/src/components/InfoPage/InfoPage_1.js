import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InfoPage_1.css';

function InfoPage_1() {
  const [childName, setChildName] = useState('');

  return (
    <div className="Page1">
      
      <div className="text1">
        <h1>
        MeddyBaby
      </h1>
      </div>

      <div className="text2">

      <label>
        우리아이 이름은
        </label>
      
      </div>

      <div className="nameBlank">
      <input
          type="text"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          />
      </div>

      <div className="text3">  
        <label>
          어린이
        </label>
      </div>


      <div className="navigator">
        
        <Link to="./InfoPage_2" className="nav-item">다음</Link>
      </div>
    </div>
  );
}


export default InfoPage_1;