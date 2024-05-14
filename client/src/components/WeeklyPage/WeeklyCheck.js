import React, { useState } from 'react';
import './WeeklyPage.css';
import pannel from '../image/pannel.png';

import chick1 from '../image/chick1.png';
import chick2 from '../image/chick2.png';

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
    newInputFields[index].imageSrc = value;
    setInputFields(newInputFields);
  };

  return (
    <div>
      <div className="background">
        <h1></h1>
      </div>

      <div className="title">
        칭찬스티커
      </div>

      <div className="pannelImage">
        <img src={pannel} className="pannel" />
      </div>

      <div className="chick1">
        <img src={chick1} className="chick1"/>
      </div>
      <div className="chick2">
        <img src={chick2} className="chick2"/>
      </div>


      <div className="howMuchStamp">
        <input
          type="number"
          value={days}
          onChange={handleDaysChange}
          min="0"
        />
      </div>

      <div className="input-fields">
        {inputFields.map((field, index) => (
          <div key={field.id}>
            <img src={`/images/${field.imageSrc}`} alt={`Image ${index + 1}`} />
            <input
              type="text"
              value={field.imageSrc}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeeklyCheck;
