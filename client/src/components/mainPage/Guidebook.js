import React, { useState } from 'react';
import './Guidebook.css';

import jam from '../image/jam.png';
import flower from '../image/flower.png';
import book2 from '../image/book2.png';

const mainPageSlides = [book2, jam]; // 메인 페이지에서 사용될 이미지 배열

// 이미지 슬라이더 컴포넌트 (기존에 제공된 코드)
function ImageSlider({ images }) {
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      {images && images.length > 0 && (
        <>
          <img
            src={images[currentImage]}
            alt={`Slide ${currentImage + 1}`}
            className="slideImage"
          />
          <button onClick={prevImage}>이전</button>
          <button onClick={nextImage}>다음</button>
        </>
      )}
    </div>
  );
}

const slides = [
  <div className='vertical-align'>
    <div className="container">
      <div className="flower-text-container">
      <img src={flower} alt="flower" className="flower" />
    <div className="text">_메인 페이지가 뭐야?</div>
      </div>
    <div className='con'>
      <ImageSlider images={mainPageSlides} />
      </div>
    
  </div>

  </div>,
  // 여기에서 이미지 슬라이더를 사용
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

  return (
    isOpen && (
      <div className="modalBackground">
        <div className="modalContent">
          <button className="closeButton" onClick={close}>&times;</button>
          <div className='all-section'>
            <h2 className="on">사용 설명서</h2>
            <div>{slides[currentSlide]}</div>
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
