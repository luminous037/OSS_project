import React, { useState, useEffect } from 'react';
import InstructionModal from './Guidebook.js';
import './Main.css';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 페이지가 로드될 때 모달을 자동으로 열고 싶다면 아래 코드 활성화
    setIsModalOpen(true);
  }, []);

  return (
    <div className='mainpage-all-container'>
      <div className='mainpage-top-container'>
        <h1>메인 페이지</h1>
        <InstructionModal isOpen={isModalOpen} close={() => setIsModalOpen(false)} />
        <button onClick={() => setIsModalOpen(true)}>사용 설명 보기</button>
      </div>

    </div>
  );
};

export default MainPage;
