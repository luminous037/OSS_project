import React, { useState } from 'react';
import './shop.css';
import chick4 from '../image/chick4.png';
import pointBox from '../image/pointBox.png';

function Shop() {
  const items = [
    { id: 1, name: '새싹모자', price: 100 },
    { id: 2, name: '산타모자', price: 500 },
    { id: 3, name: '용머리띠', price: 500 },
    { id: 4, name: '마녀모자', price: 1000 },
    { id: 5, name: '분홍리본', price: 1000 },
    { id: 6, name: '황금왕관', price: 5000 },
  ];

  const [purchaseStatus, setPurchaseStatus] = useState({});
  const [characterEquip, setCharacterEquip] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const handlePurchase = (item) => {
    setCurrentItem(item);
    setModalIsOpen(true);
  };

  const confirmPurchase = () => {
    setPurchaseStatus({ ...purchaseStatus, [currentItem.id]: true });
    setCharacterEquip({ ...characterEquip, [currentItem.id]: true });
    setModalIsOpen(false);
  };

  const cancelPurchase = () => {
    setModalIsOpen(false);
  };

  return (
    <div>

        <div className="background">
            <h1></h1>
        </div>

        <div className="pointBoxImage">
            <img src ={pointBox} className="pointBox" />
        </div>

        <div className="title">
            <h1>상점</h1>
        </div>

        <div className="chick4">
            <img src={chick4} className="chick4" />
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
            <h2>구매 확인</h2>
            <p>
              '{currentItem?.name}'을(를) {currentItem?.price}원에 구매하시겠습니까?
            </p>
            <div className="modal-buttons">
              <button onClick={confirmPurchase}>확인</button>
              <button onClick={cancelPurchase}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shop;
