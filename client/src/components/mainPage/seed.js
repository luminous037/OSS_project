import React, { useState, useEffect } from 'react';
import './seed.css';
import jam from '../image/jam.png';
import sprout from '../image/chick2.png';
import flower from '../image/flower.png';
import tree from '../image/drop.png';

function Seed({ rainCount }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeed, setSelectedSeed] = useState(() => {
    const savedSeed = localStorage.getItem('selectedSeed');
    return savedSeed ? JSON.parse(savedSeed) : null;
  });
  const [seedStage, setSeedStage] = useState(() => {
    const savedStage = localStorage.getItem('seedStage');
    return savedStage ? savedStage : 'seed';
  });

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
    setSeedStage('seed');
    toggleModal();
  };

  useEffect(() => {
    if (rainCount > 0 && selectedSeed) {
      if (rainCount >= 3) {
        setSeedStage('tree');
      } else if (rainCount >= 2) {
        setSeedStage('flower');
      } else {
        setSeedStage('sprout');
      }
    }
  }, [rainCount, selectedSeed]);

  useEffect(() => {
    if (selectedSeed) {
      localStorage.setItem('selectedSeed', JSON.stringify(selectedSeed));
    }
    localStorage.setItem('seedStage', seedStage);
  }, [selectedSeed, seedStage]);

  const renderSeedStage = () => {
    switch (seedStage) {
      case 'sprout':
        return <img src={sprout} alt="새싹 이미지" className="sprout" />;
      case 'flower':
        return <img src={flower} alt="꽃 이미지" className="flower" />;
      case 'tree':
        return <img src={tree} alt="나무 이미지" className="tree" />;
      default:
        return selectedSeed ? <img src={selectedSeed.imageUrl} alt="씨앗 이미지" className="seed-planted" /> : null;
    }
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

      {selectedSeed && (
        <div>
          {renderSeedStage()}
          <p>선택한 씨앗: {selectedSeed.name}</p>
        </div>
      )}
    </div>
  );
}

export default Seed;
