// App.js 또는 메인 페이지의 컴포넌트 파일에 아래 코드 추가
import React, { useState, useEffect } from 'react';
import InstructionModal from './Guidebook';

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 페이지가 로드될 때 자동으로 창 생성함
    setIsModalOpen(true);
  }, []);

  return (
    <div>
      <h1>메인 페이지</h1>
      <InstructionModal isOpen={isModalOpen} close={() => setIsModalOpen(false)} />
      {}
      <button onClick={() => setIsModalOpen(true)}>사용 설명 보기</button>
    </div>
  );
};

export default MainPage;
