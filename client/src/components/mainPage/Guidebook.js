import React, { useState } from 'react';
import './Guidebook.css';
import chick from '../image/chick.png';

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

 // JSX 요소 내 스타일 적용 예시
return (
  isOpen && (
    <div className="modalBackground">
      <div className="modalContent">
        <button className="closeButton" onClick={close}>&times;</button>
        <h2>간단한 사용 설명서
        </h2>
        <p>{slides[currentSlide]}</p>
        <div className="middle-section">
       

        </div>

        
        <div className="buttonGroup">
          <button className="button" onClick={prevSlide}>Previous</button>
          <button className="button" onClick={close}>Close</button>
          <button className="button" onClick={nextSlide}>Next</button>
        </div>
      </div>
    </div>
  )
);

};

export default InstructionModalWithSlide;
