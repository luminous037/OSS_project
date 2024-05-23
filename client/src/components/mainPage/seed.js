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


function Seed({ rainCount, setRainCount }) { // rainCount 상태와 함께 setRainCount 함수를 prop으로 받음 prop로 받아야 다른 js 파일에서 만든 함수들을 해당 js(페이지)에서도 사용할 수 있음.
  const [isseedModalOpen, setIsseedModalOpen] = useState(false); //씨앗 모달창 관리
  const [isModalOpen, setIsModalOpen] = useState(false);//설명창 모달
  const [isMoneyModalOpen, setIsMoneyModalOpen] = useState(false); // 보유 금액 모달 상태 추가
  const [selectedSeed, setSelectedSeed] = useState(() => {
    const savedSeed = localStorage.getItem('selectedSeed'); //씨앗 심은 상태 저장
    return savedSeed ? JSON.parse(savedSeed) : null; //사용자가 웹페이지를 닫아도 심은 상태가 남아있도록 함.
  });
  const [seedStage, setSeedStage] = useState(() => {
    const savedStage = localStorage.getItem('seedStage'); //씨앗의 성장 상태를 저장
    return savedStage ? savedStage : 'seed';
  });
  const [money, setMoney] = useState(() => {
    const savedMoney = localStorage.getItem('money'); //보유한 돈을 저장
    return savedMoney ? JSON.parse(savedMoney) : 0;
  });

  /*씨앗 종류- 씨앗 모달창에서 씨앗 종류를 나타내기 위해서 구현*/
  const seeds = [
    { id: 1, name: '평범한 씨앗', imageUrl: seed },
    { id: 2, name: '별 씨앗', imageUrl: star2 },
    { id: 3, name: '노란 씨앗', imageUrl: flowerly }
  ];

  /*씨앗 모달창 구현*/
  const toggleModal = () => {
    setIsseedModalOpen(!isseedModalOpen);
  };
  /*주머니(보유 금액) 모달창 구현*/
  const toggleMoneyModal = () => {
    setIsMoneyModalOpen(!isMoneyModalOpen);
  };

  /*모달창을 열어 씨앗을 선택했을 때 수행하는 과정들을 나타내는 함수*/
  const selectSeed = (seed) => {
    setSelectedSeed(seed); //씨앗을 선택함
    setSeedStage('seed'); //씨앗의 상태를 저장함
    setRainCount(0); // 새로운 씨앗을 심을 때 rainCount(비를 내린 횟수)를 초기화
    toggleModal(); //모달창
  };

  /*물을 준 횟수에 따른 씨앗의 상태 관리*/
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

  /*씨앗을 심었는지 여부, 씨앗의 상태(물을 준 횟수에 따른), 보유한 금액을 로컬 저장소에 저장*/
  useEffect(() => {
    if (selectedSeed) {
      localStorage.setItem('selectedSeed', JSON.stringify(selectedSeed));
    }
    localStorage.setItem('seedStage', seedStage);
    localStorage.setItem('money', JSON.stringify(money));
  }, [selectedSeed, seedStage,money]);

  /*물을 4번 준 후 보상을 얻을 수 있는 상태가 되었을 때 수행하는 과정을 나타내는 함수*/
  const handleHarvest = () => {
    setMoney(money + 100); //보상 수확 버튼을 누르면 돈 100을 얻음
    setSelectedSeed(null);//씨앗이 심었는지 여부를 안 심은 것으로 바꿈
    setSeedStage('seed');
    setRainCount(0); // 보상을 수확할 때 rainCount(물을 준 횟수)를 초기화
    localStorage.removeItem('selectedSeed'); //로컬 저장소에서 씨앗을 심은 내용을 삭제
    localStorage.removeItem('seedStage'); //로컬 저장소에서 씨앗의 상태를 삭제
  };

  /*물을 준 횟수에 따른 씨앗의 상태을 이미지로 나타내고 싶어 구현한 함수*/
  const renderSeedStage = () => {
    switch (seedStage) {
      //물을 1회 준 상태이자 새싹 상태
      case 'sprout':
        return <img src={sprout} alt="새싹 이미지" className="sprout" />;
        //물을 2회 준 상태이자 꽃 상태
      case 'flower':
        return <img src={flower} alt="꽃 이미지" className="flower" />;
        //물을 3회 준 상태이자 나무 상태
      case 'tree':
        return <img src={tree} alt="나무 이미지" className="tree" />;
        //물을 4회 준 상태이자 보상이 열린 상태
      case 'rewardTree':
        return (
          <div>
            <img src={rewardTree} alt="보상 열린 나무 이미지" className="reward-tree" />
            <button className="accept" onClick={handleHarvest}>보상 얻기</button> 
          </div>
        );
      default:
        return selectedSeed ? <img src={selectedSeed.imageUrl} alt="씨앗 이미지" className="seed-planted" /> : null;
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
                  <img src={seed.imageUrl} alt={`${seed.name} 이미지`} className="seed-image"/>
                </div>
                <span>{seed.name}</span>
              </li>
              
            ))}
            <button  className="seedcancelbutton" onClick={toggleModal}>[닫기]</button> 
          </ul>
          
        </div>
      )}


{isMoneyModalOpen && (
        <div className="modaldal">
          <p3>•--------------•</p3>
          <h7>💰 보유 금액 💰</h7>
          <p3>보유 금액: {money}</p3>
          <button className="moneycancelbutton"onClick={toggleMoneyModal}>[닫기]</button> {/* 닫기 버튼 추가 */}
        </div>
      )}

      {selectedSeed && (
        <div>
          {renderSeedStage()}
          {/*<p>선택한 씨앗: {selectedSeed.name}</p>*/}
          
          
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
