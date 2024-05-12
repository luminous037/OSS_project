import React, { useState } from 'react';
import './Guidebook.css';

import jam from '../image/jam.png';
import flower from '../image/flower.png';
import first from '../image/first.png';

const slides = [
  <div class="container">
  <img src={flower} alt="flower" className="flower" />
  <div class="text">메인 페이지</div>
</div>,

  '상점 페이지.',
  '설정 페이지.',
  '부가 페이지.'
  
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

  // 현재 슬라이드에 맞는 이미지를 선택하는 함수
  const getImageForCurrentSlide = () => {
    switch (currentSlide) {
      case 0:
        return first;
      case 1:
        return jam;
      
      default:
        return null;
    }
  };

  return (
    isOpen && (
      <div className="modalBackground">
        <div className="modalContent">
        <button className="closeButton" onClick={close}>&times;</button>
          <div className='all-section'>
          <h2>사용 설명서</h2>
          <p>{slides[currentSlide]}</p>
          <div className="middle-section">
            
            <img src={getImageForCurrentSlide()} alt={`Slide ${currentSlide}`} className="slideImage" />
          </div>
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

