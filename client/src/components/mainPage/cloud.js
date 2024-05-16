import React, { useState, useEffect } from 'react';
import './cloud.css';

function Cloud() {
    /*구름 퍼센테이지 관리*/
    const [percentage, setPercentage] = useState(() => {
        const savedPercentage = localStorage.getItem('cloudPercentage');
        return savedPercentage ? JSON.parse(savedPercentage) : 0;
      });
    




      
  return (
    <div className="App">
      <button onClick={handleClearClick}>Clear</button>
      <div className="cloud" onClick={handleCloudClick}>
        ☁️ {percentage}%
      </div>
    </div>
  );

}

export default Cloud;