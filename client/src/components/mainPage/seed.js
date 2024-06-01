import React, { useState, useEffect } from 'react';
import './seed.css';
import seed from '../image/seed.png';
import sprout from '../image/sprout.png';
import flower from '../image/flower5.png';
import tree from '../image/tree.png';
import rewardTree from '../image/reward.png';
import InstructionModal from './Guidebook.js';
import star2 from '../image/star2.png';
import flowerly from '../image/flower.png';

function Seed({ rainCount, setRainCount }) {
  const [isseedModalOpen, setIsseedModalOpen] = useState(false); //씨앗 모달창 관리
  const [isModalOpen, setIsModalOpen] = useState(false);//설명창 모달
  const [isMoneyModalOpen, setIsMoneyModalOpen] = useState(false); // 보유 금액 모달 상태 추가
  const [selectedSeed, setSelectedSeed] = useState(null); //씨앗 심은 상태 저장
  const [seedStage, setSeedStage] = useState(null); //씨앗의 성장 상태를 저장

  const [userData, setUserData] = useState({
    plant: '',
    rain: 0,
    point: 0
  });

  const seeds = [
    { id: 1, name: '평범한 씨앗', imageUrl: seed },
    { id: 2, name: '별 씨앗', imageUrl: star2 },
    { id: 3, name: '노란 씨앗', imageUrl: flowerly }
  ];

  useEffect(() => {
    fetch('/userProfile')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched user data:', data); // 서버에서 받은 데이터 출력
        const user = {
          plant: data[0].plant,
          point: parseInt(data[0].points, 10)
        };
        setSelectedSeed(user.plant);
        setUserData(user);
        console.log(user);
      })
      .catch(error => {
        console.error('유저 정보를 가져오는 중 에러:', error);
      });
  }, []);

  const updateUserData = (seed) => {
    fetch('http://localhost:4000/plantUpdate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ plant: seed, point: userData.point })
    })
      .then(() => {
        console.log('User data updated');
      })
      .catch(err => {
        console.error('userUpdate중 오류: ', err);
      });
  };

  const toggleModal = () => {
    setIsseedModalOpen(!isseedModalOpen);
  };

  const toggleMoneyModal = () => {
    setIsMoneyModalOpen(!isMoneyModalOpen);
  };

  const selectSeed = (seed) => {
    setSeedStage('seed'); //씨앗의 상태를 저장함
    setSelectedSeed(seed); // 선택된 씨앗을 상태에 저장
    setUserData(prevState => ({
      ...prevState, // 이전 상태를 복사
      plant: seed.id
    }));
    updateUserData(seed.id);
    toggleModal(); // 모달창 닫기
  };

  useEffect(() => {
    if (selectedSeed && seedStage !== 'rewardTree') {
      if (rainCount >= 4) {
        setSeedStage('rewardTree');
      } else if (rainCount >= 3) {
        setSeedStage('tree');
      } else if (rainCount >= 2) {
        setSeedStage('flower');
      } else if (rainCount >= 1) {
        setSeedStage('sprout');
      } else {
        setSeedStage('seed');
      }
    }
  }, [rainCount, seedStage]);

  const handleHarvest = () => {
    setSeedStage('seed');
    setSelectedSeed(null);
    setRainCount(0); // reset rain count in parent component
    setUserData(prevUserData => ({
      ...prevUserData, // 이전 상태를 복사
      plant: '',
      point: prevUserData.point + 100 // 이전 돈에 100 추가
    }));
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
            <button className="accept" onClick={handleHarvest}>보상 얻기</button>
          </div>
        );
      default:
        return selectedSeed ? <img src={selectedSeed.imageUrl} alt="씨앗 이미지" className="seed-planted" /> : null; // 선택된 씨앗이 존재할 때만 이미지 표시
    }
  };

  return (
    <div className="Seed">
      {isseedModalOpen && (
        <div className="modaldal">
          <p5>•--------------•</p5>
          <p5> 🌱 씨앗 선택 🌱</p5>
          <ul>
            {seeds.map((seed) => (
              <li key={seed.id} onClick={() => selectSeed(seed)} className="seed-list-item">
                <div className="seed-image-container">
                  <img src={seed.imageUrl} alt={`${seed.name} 이미지`} className="seed-image" />
                </div>
                <span>{seed.name}</span>
              </li>
            ))}
            <button className="seedcancelbutton" onClick={toggleModal}>[닫기]</button>
          </ul>
        </div>
      )}

      {isMoneyModalOpen && (
        <div className="modaldal">
          <p3>•--------------•</p3>
          <h7>💰 보유 금액 💰</h7>
          <p3>보유 금액: {userData.point}</p3>
          <button className="moneycancelbutton" onClick={toggleMoneyModal}>[닫기]</button>
        </div>
      )}

      {selectedSeed && (
        <div>
          {renderSeedStage()}
        </div>
      )}

      <div className="sign-container">
        <button className="plantbutton" onClick={toggleModal}></button>
        <button className="moneybutton" onClick={toggleMoneyModal}></button>
        <InstructionModal isOpen={isModalOpen} close={() => setIsModalOpen(false)} />
        <button className="button-hover" onClick={() => setIsModalOpen(true)}></button>
      </div>
    </div>
  );
}

export default Seed;
