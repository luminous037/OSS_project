import React, { useState } from 'react';
import './Guidebook.css';

import flower from '../image/flower.png';
import book2 from '../image/book2.png';
import book1 from '../image/book1.png';
import book3 from '../image/book3.png';
import book4 from '../image/book4.png';
import book5 from '../image/book5.png';
import book6 from '../image/book6.png';
import book7 from '../image/book7.png';
import book8 from '../image/book8.png';
import book9 from '../image/book9.png';
import book10 from '../image/book10.png';
import book11 from '../image/book11.png';

const mainPageSlides = [book2, book1,book6, book3, book5, book4]; // 메인 페이지에서 사용될 이미지 배열
const shopPageSlides = [book7, book8, book9];
const stampPageSlides = [book10, book11];


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
        <div className='slide-button-box'>
        <img
            src={images[currentImage]}
            alt={`Slide ${currentImage + 1}`}
            className="slideImage"
          />
          <div className='button-box'>
          <button className="click" onClick={prevImage}>이전</button>
          <button className="click" onClick={nextImage}>다음</button>

          </div>
          
        </div>
        
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
  <div className='vertical-align'>
    <div className="container">
      <div className="flower-text-container">
      <img src={flower} alt="flower" className="flower" />
    <div className="text">_상점 페이지가 뭐야?</div>
      </div>
    <div className='con'>
      <ImageSlider images={shopPageSlides} />
      </div>
  </div>
  </div>,

   <div className='vertical-align'>
    <div className="container">
      <div className="flower-text-container">
      <img src={flower} alt="flower" className="flower" />
    <div className="text">_칭찬 스티커 페이지가 뭐야?</div>
      </div>
    <div className='con'>
      <ImageSlider images={stampPageSlides} />
      </div>
  </div>
  </div>,
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

          <div className='tip-container'>
            <div className='flower-notice-box'>
            <img src={flower} alt="flower" className="flower_1" style={{width: '40px', height: '40px'}} />
            <div className='notice'>_꿀팁</div>
            </div>
            
            <div className='tip'>1. 정한 시간에 약을 잘 챙겨 먹는다.</div>
            <div className='tip'>2. 약을 먹고 clear 버튼을 누른다.</div>
            <div className='tip'>3. 약을 먹으면 구름이 차오른다.</div>
            <div className='tip'>4. 100%가 채워진 구름을 눌러 비를 내린다.</div>
            <div className='tip'>5. 7번 물을 주어 심은 씨앗을 키운다.</div>
            <div className='tip'>6. 나무에 열린 보상들을 받는다.</div>
            <div className='tip'>7. 상점에서 즐겁게 쇼핑을 한다..</div>
            </div>

          <div className="buttonGroup">
            <button className="button" onClick={prevSlide}>이전</button>
            <button className="button" onClick={nextSlide}>다음</button>
          </div>
          
        </div>
      </div>
    )
  );
};

export default InstructionModalWithSlide;
