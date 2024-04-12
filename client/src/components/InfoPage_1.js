import React, { useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';


function InfoPage_1() {
  const [childName, setChildName] = useState('');

  
  return (
    <div className="App">
      Meddy Baby
      <p>
        우리 아이 이름은{' '}
        <input
          type="text"
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
        />{' '}
        어린이
      </p>
      
      <div className="navigator">
       <Link to="./InfoPage_2" className="nav-item">다음</Link>
      </div>
    </div>
  );
}

export default InfoPage_1;
