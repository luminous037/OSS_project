import React, { useState, useEffect } from 'react';
import './shop.css';
import chick4 from '../image/chick4.png';
import pointBox from '../image/pointBox.png';
import pannel from '../image/pannel.png';
import coin from '../image/coin.png';
import plant from '../image/plant.png';
import santa from '../image/santa.png';
import dragon from '../image/dragon.png';
import witch from '../image/witch.png';
import ribbon from '../image/ribbon.png';
import crown from '../image/crown.png';

function Shop() {
    const [point, setPoint] = useState(5000);
    const [purchaseStatus, setPurchaseStatus] = useState({});
    const [characterEquip, setCharacterEquip] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [equippedItemImages, setEquippedItemImages] = useState([]);

  const getItemImage = (id) => {
    switch(id) {
      case 1: return plant;
      case 2: return santa;
      case 3: return dragon;
      case 4: return witch;
      case 5: return ribbon;
      case 6: return crown;
      default: return null;
    }
  };

  const handlePurchase = (item) => {
    if (purchaseStatus[item.id]) { // 구매 완료된 아이템을 클릭한 경우
      showSelectImage(item.id); // 여기서 showSelectImage 호출
    } else {
      setCurrentItem(item);
      setModalIsOpen(true);
    }
  };

  const confirmPurchase = () => {
    if (point < currentItem.price) {
      setModalIsOpen(true);
      setCurrentItem(null);
      return;
    }
    const newPoint = point - currentItem.price;
    setPoint(newPoint);
    // 객체 상태를 올바르게 업데이트
    setPurchaseStatus(prevStatus => ({ ...prevStatus, [currentItem.id]: true }));
    setCharacterEquip(prevEquip => ({ ...prevEquip, [currentItem.id]: true }));
    setModalIsOpen(false); // 모달 닫힘
    showExplosionAnimation(); // 폭죽 애니메이션 실행
  };

  const cancelPurchase = () => {
    setModalIsOpen(false);
  };

  const showExplosionAnimation = () => {
    const explodeAnimation = document.createElement('div');
    explodeAnimation.classList.add('explode-animation');
    document.body.appendChild(explodeAnimation);
    setTimeout(() => {
      explodeAnimation.remove();
    }, 1100);
  };

  const items = [
    { id: 1, name: '새싹모자', price: 100 },
    { id: 2, name: '산타모자', price: 500 },
    { id: 3, name: '용머리띠', price: 500 },
    { id: 4, name: '마녀모자', price: 1000 },
    { id: 5, name: '분홍리본', price: 1000 },
    { id: 6, name: '황금왕관', price: 5000 },
  ];

  const showSelectImage = (imageSrc) => {
    // img 요소를 생성
    const imageSelected = document.createElement('img');
  
    // imageSrc 값에 따라 다른 이미지 파일 경로를 설정
    let imagePath = '';
    switch (imageSrc) {
      case 1:
        imagePath = plant;
        break;
      case 2:
        imagePath = santa;
        break;
      case 3:
        imagePath = dragon;
        break;
      case 4:
        imagePath = witch;
        break;
      case 5:
        imagePath = ribbon;
        break;
      case 6:
        imagePath = crown;
        break;
      default:
        console.log('유효하지 않은 imageSrc 값입니다.');
        return; // 유효하지 않은 경우 함수 종료
    }
  
    // 선택한 이미지 파일 경로로 img 요소의 src 속성 설정
    imageSelected.src = imagePath;

    const showSelectImage = (imageSrc) => {
        // img 요소를 생성
        const imageSelected = document.createElement('img');
      
        // imageSrc 값에 따라 다른 이미지 파일 경로를 설정
        let imagePath = '';
        switch (imageSrc) {
          case 1:
            imagePath = plant;
            break;
          case 2:
            imagePath = santa;
            break;
          case 3:
            imagePath = dragon;
            break;
          case 4:
            imagePath = witch;
            break;
          case 5:
            imagePath = ribbon;
            break;
          case 6:
            imagePath = crown;
            break;
          default:
            console.log('유효하지 않은 imageSrc 값입니다.');
            return; // 유효하지 않은 경우 함수 종료
        }
      
        // 선택한 이미지 파일 경로로 img 요소의 src 속성 설정
        imageSelected.src = imagePath;
      
        // 이미지에 스타일 클래스 추가
        imageSelected.classList.add('img-custom-style');
      
        // 'Shop' 요소를 찾음
        const shopElement = document.getElementById('Shop');
      
        // 생성된 img 요소를 Shop 페이지에 출력
        shopElement.appendChild(imageSelected);
      };
      imageSelected.src = imagePath;

        imageSelected.classList.add('img-custom-style');
  
    // 생성된 img 요소를 Shop 페이지에 출력
    document.getElementById('Shop').appendChild(imageSelected);
  };
  

  return (
    <div id = "Shop">
      {equippedItemImages.length > 0 && equippedItemImages.map((item, index) => (
        <div key={index} className="equipped-item">
          <img src={item.image} className="equipped-item-image" alt={item.name} />
        </div>
      ))}

      <div className="background">
        <h1></h1>
      </div>

      <div className="pointBoxImage">
        <img src={pointBox} className="pointBox" />
      </div>

      <img src={coin} className="coin" />

      <div className="point">
        <p>{point}</p>
      </div>

      <div className="title">
        <h1>상점</h1>
      </div>

      <div className="chick4">
        <img src={chick4} className="chick4" />
      </div>

      <div className="pannelImage">
        <img src={pannel} className="pannel" />
      </div>

      <div className="items">
        {items.map((item) => (
          <div key={item.id} className="item">
            <h3>{item.name}</h3>
            <img 
              src={
                item.id === 1 ? plant :
                item.id === 2 ? santa :
                item.id === 3 ? dragon :
                item.id === 4 ? witch :
                item.id === 5 ? ribbon :
                item.id === 6 ? crown :
                null
              } 
              className="item-image" 
              alt={item.name} 
              onClick={() => handlePurchase(item)} 
            />
            <h4>
              {purchaseStatus[item.id] ? (
                <p className="purchased">구매 완료</p>
              ) : (
                <p className="price">{item.price} 포인트</p>
              )}
            </h4>
          </div>
        ))}
      </div>

      {modalIsOpen && (
        <div className="modal">
          <div className="modal-content">
            {currentItem ? (
              <>
                <h2>구매 확인</h2>
                <p>'{currentItem?.name}'을(를) {currentItem?.price}원에 구매하시겠습니까?</p>
                <div className="modal-buttons">
                  <button onClick={confirmPurchase}>확인</button>
                  <button onClick={cancelPurchase}>취소</button>
                </div>
              </>
            ) : (
              <>
                <h2>포인트 부족</h2>
                <p>포인트가 부족하여 구매할 수 없습니다.</p>
                <div className="modal-buttons">
                  <button onClick={() => setModalIsOpen(false)}>확인</button>
                </div>

              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;
