import React, { useState } from 'react';
import './WeeklyPage.css';

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
      newInputFields.push({ id: i, imageSrc: `image_${i + 1}.jpg` });
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
