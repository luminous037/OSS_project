import React, { useState, useEffect } from 'react';
import './seed.css'; 
import jam from '../image/jam.png';
import sprout from '../image/chick2.png'; 

function Seed() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSeed, setSelectedSeed] = useState(null);

  const seeds = [
    { id: 1, name: '해바라기 씨앗', imageUrl: jam },
    { id: 2, name: '장미 씨앗', imageUrl: jam },
    { id: 3, name: '튤립 씨앗', imageUrl: jam }
  ];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const selectSeed = (seed) => {
    setSelectedSeed(seed);
    setIsSprouted(false);
    setIsSeedPlanted(true); // 씨앗 심기 상태를 true로 설정
    toggleModal();
  };








  return (
    <div className="Seed">
      <button onClick={toggleModal}>씨앗 심기</button>
      {isModalOpen && (
        <div className="modal">
          <h2>씨앗 선택</h2>
          <ul>
            {seeds.map((seed) => (
              <li key={seed.id} onClick={() => selectSeed(seed)} className="seed-list-item">
                <div className="seed-image-container">
                  <img src={seed.imageUrl} alt={`${seed.name} 이미지`} className="seed-image"/>
                </div>
                {seed.name}
              </li>
            ))}
          </ul>
        </div>
      )}

</div>
  );


}

export default Seed;
