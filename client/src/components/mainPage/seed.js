import React, { useState, useEffect } from 'react';
import './seed.css';
import jam from '../image/jam.png';
import sprout from '../image/chick2.png';
import flower from '../image/flower.png';
import tree from '../image/drop.png';
import rewardTree from '../image/cloud.png'; // 보상 열린 나무 이미지 추가

function Seed({ rainCount, setRainCount }) { // rainCount 상태와 함께 setRainCount 함수를 prop으로 받음
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSeed, setSelectedSeed] = useState(() => {
    const savedSeed = localStorage.getItem('selectedSeed');
    return savedSeed ? JSON.parse(savedSeed) : null;
  });
  const [seedStage, setSeedStage] = useState(() => {
    const savedStage = localStorage.getItem('seedStage');
    return savedStage ? savedStage : 'seed';
  });
  const [money, setMoney] = useState(() => {
    const savedMoney = localStorage.getItem('money');
    return savedMoney ? JSON.parse(savedMoney) : 0;
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
    setRainCount(0); // 새로운 씨앗을 심을 때 rainCount를 초기화
    toggleModal();
  };

  useEffect(() => {
    if (rainCount > 0 && selectedSeed && seedStage !== 'rewardTree') {
      if (rainCount >= 4) {
        setSeedStage('rewardTree');
      } else if (rainCount >= 3) {
        setSeedStage('tree');
      } else if (rainCount >= 2) {
        setSeedStage('flower');
      } else {
        setSeedStage('sprout');
      }
    }
  }, [rainCount, selectedSeed, seedStage]);

  useEffect(() => {
    if (selectedSeed) {
      localStorage.setItem('selectedSeed', JSON.stringify(selectedSeed));
    }
    localStorage.setItem('seedStage', seedStage);
    localStorage.setItem('money', JSON.stringify(money));
  }, [selectedSeed, seedStage,money]);

  const handleHarvest = () => {
    setMoney(money + 100); // 예시로 100의 돈을 추가
    setSelectedSeed(null);
    setSeedStage('seed');
    setRainCount(0); // 보상을 수확할 때 rainCount를 초기화
    localStorage.removeItem('selectedSeed');
    localStorage.removeItem('seedStage');
  };

  const renderSeedStage = () => {
    switch (seedStage) {
      case 'sprout':
        return <img src={sprout} alt="새싹 이미지" className="sprout" />;
      case 'flower':
        return <img src={flower} alt="꽃 이미지" className="flower" />;
      case 'tree':
        return <img src={tree} alt="나무 이미지" className="tree" />;
      case 'rewardTree':
        return (
          <div>
            <img src={rewardTree} alt="보상 열린 나무 이미지" className="reward-tree" />
            <button onClick={handleHarvest}>보상 수확</button>
          </div>
        );
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
      <p>보유 금액: {money}</p>
    </div>
  );
}

export default Seed;
