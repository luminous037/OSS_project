import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InfoPage_1.css';

function InfoPage_1() {
  const [childName, setChildName] = useState('');

  return (
    <div className="Page1">
      
      <h1
      style={{
        color: "#f00",
        borderRight: "10px",
        marginBottom: "30px",
        opacity: 1.0,
      }}
      >
        MeddyBaby
      </h1>
      <p>
        우리아이 이름은
      </p>

      <div classNmae="nameBlank">
      <input
          type="text"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          />
      </div>

      <p>
        어린이
      </p>

      <div className="navigator">
        <Link to="./InfoPage_2" className="nav-item">다음</Link>
      </div>
    </div>
  );
}


export default InfoPage_1;
