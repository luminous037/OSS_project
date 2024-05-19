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
  const [point, setPoint] = useState(5000); /*포인트*/
  const [purchaseStatus, setPurchaseStatus] = useState({});
  const [characterEquip, setCharacterEquip] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handlePurchase = (item) => {
    setCurrentItem(item);
    setModalIsOpen(true);
  };

  const confirmPurchase = () => {
    if (point < currentItem.price) {
      setModalIsOpen(true);
      setCurrentItem(null);
      return;
    }
    const newPoint = point - currentItem.price;
    setPoint(newPoint);
    setPurchaseStatus({ ...purchaseStatus, [currentItem.id]: true });
    setCharacterEquip({ ...characterEquip, [currentItem.id]: true });
    setModalIsOpen(false); // 모달 닫힘
    showExplosionAnimation(); // 폭죽 애니메이션 실행
  };

  const cancelPurchase = () => {
    setModalIsOpen(false);
  };

  const showExplosionAnimation = () => {
    const explodeAnimation = document.createElement('div');
    explodeAnimation.classList.add('explode-animation');
    explodeAnimation.classList.add('congrate-animation');
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

  return (
    <div>
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
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p> {item.price}</p>
            <button
              onClick={() => {
                if (!purchaseStatus[item.id]) {
                  handlePurchase(item);
                } else {
                  setCharacterEquip({ ...characterEquip, [item.id]: true });
                }
              }}
              disabled={purchaseStatus[item.id]}
            >
              {purchaseStatus[item.id] ? '구매 완료' : '구매하기'}
            </button>
          </div>
        ))}
      </div>

      {modalIsOpen && (
        <div className="modal">
          <div className="modal-content">
            {currentItem ? (
              <>
                <h2>구매 확인</h2>
                <p>
                  '{currentItem?.name}'을(를) {currentItem?.price}원에 구매하시겠습니까?
                </p>
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
