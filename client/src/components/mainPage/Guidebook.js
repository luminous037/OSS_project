import React, { useState } from 'react';

const slides = [
  '메인 페이지.',
  '상점 페이지.',
  '설정 페이지.',
  '부가 페이지.'
  // 필요한 만큼 페이지(슬라이드)를 추가하세요.
];

const InstructionModalWithSlide = ({ isOpen, close }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
      <h2>간단한 사용 설명서</h2>
      <p>{slides[currentSlide]}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={prevSlide}>이전</button>
        <button onClick={close}>닫기</button>
        <button onClick={nextSlide}>다음</button>
      </div>
    </div>
  );
};

export default InstructionModalWithSlide;
