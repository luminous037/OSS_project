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
    const [point, setPoint] = useState(0);
    const [purchaseStatus, setPurchaseStatus] = useState({
      '1' : false,
      '2' : false,
      '3' : false,
      '4' : false,
      '5' : false,
      '6' : false
    });
    const [characterEquip, setCharacterEquip] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [equippedItemImages, setEquippedItemImages] = useState([]);
    


    let lastImage = null; // 전역 변수로 lastImage 선언
    const shopElement = document.getElementById('Shop');

    const items = [
      { id: 1, name: '새싹모자', price: 100 },
      { id: 2, name: '산타모자', price: 500 },
      { id: 3, name: '용머리띠', price: 500 },
      { id: 4, name: '마녀모자', price: 1000 },
      { id: 5, name: '분홍리본', price: 1000 },
      { id: 6, name: '황금왕관', price: 5000 },
    ];

    useEffect(() => { //유저 정보 불러오기
      fetch('http://localhost:4000/userProfile')
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const userPoint = data[0].points
            const userClothes = data[0].clothes
            console.log(userPoint);
            console.log(userClothes);
            setPoint(userPoint);
            setCharacterEquip(userClothes);
          }
        })
        .catch(error => {
          console.error('유저 정보를 가져오는 중 에러:', error);
        });
    },[]);

    useEffect(()=>{ //구매한 아이템 정보 가져오기
      fetch('http://localhost:4000/item')
      .then(response=>response.json())
      .then(data=>{
        setPurchaseStatus(prevStatus => ({ ...prevStatus, ...data }));
        console.log('구매한 아이템: ',data);
      })
      .catch((err)=>{
        console.log('아이템 목록 조회 실패');
      })
    },[])


  useEffect(() => { // 포인트 또는 구매 상태가 변경될 때마다 서버에 동기화
    if (currentItem === null) return; // 구매 취소 시에는 동기화 하지 않음
    fetch('http://localhost:4000/updatePoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ points: point, item: purchaseStatus })
    })
    .then(data => {
      console.log('point, item 동기화 성공:', purchaseStatus);
    })
    .catch(err => {
      console.error('PointUpdate 중 오류: ', err);
    });
  }, [purchaseStatus]);



  const handlePurchase = (item) => {

    if (purchaseStatus[item.id]) {// 구매 완료된 아이템을 클릭한 경우
      showSelectImage(item.id); // 여기서 showSelectImage 호출
    } 
    else {
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
    const id = currentItem.id;
    console.log(newPoint);

    // 상태 업데이트 후 서버에 동기화는 useEffect에서 처리
    setPoint(newPoint);
    setPurchaseStatus(prevStatus => ({ ...prevStatus, [id]: true }));
    setCharacterEquip(prevEquip => ({ ...prevEquip, [id]: true })); //착용상태 저장 코드 추가 필요

  //   fetch('http://localhost:4000/updateUserProfile', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     points: newPoint,
  //     clothes: id // clothes 값을 구매한 아이템의 id로 업데이트
  //   })
  // })
  // .then(response => response.json())
  // .then(data => {
  //   console.log('userProfile의 clothes 값 업데이트 완료:', data);
  // })
  // .catch(err => {
  //   console.error('userProfile의 clothes 값 업데이트 중 오류: ', err);
  // });

  
    setModalIsOpen(false); // 모달 닫기
    showExplosionAnimation(); // 폭죽 애니메이션 실행

    lastImage = null;
  };

  const cancelPurchase = () => {
    setModalIsOpen(false);
    setCurrentItem(null);
  };

  const showExplosionAnimation = () => {
    const explodeAnimation = document.createElement('div');
    explodeAnimation.classList.add('explode-animation');
    document.body.appendChild(explodeAnimation);
    setTimeout(() => {
      explodeAnimation.remove();
    }, 1100);
  };

  const changeClothes = (id) => {

    // 착용 상태를 저장하고 서버에 업데이트
    setCharacterEquip(prevEquip => {
      const newEquip = { ...prevEquip, [id]: true };
      fetch('http://localhost:4000/updateUserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clothes: id, // 착용한 아이템의 id를 업데이트
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log('userProfile의 clothes 값 업데이트 완료:', data);
      })
      .catch(err => {
        console.error('userProfile의 clothes 값 업데이트 중 오류: ', err);
      });
      return newEquip;
    });

  }


  const showSelectImage = (imageSrc) => {
    const imageSelected = document.createElement('img');
    
    let imagePath = '';
    let imageClass = ''; // 이미지에 추가될 클래스
  
    // 이미지가 이미 보여지고 있는지 여부를 추적하는 상태
    const isImageVisible = !!document.getElementById(`image-${imageSrc}`);
  
    switch (imageSrc) {
      case 1:
        imagePath = plant;
        imageClass = 'image-1'; // 이미지 1에 해당하는 클래스
        break;
      case 2:
        imagePath = santa;
        imageClass = 'image-2'; // 이미지 2에 해당하는 클래스
        break;
      case 3:
        imagePath = dragon;
        imageClass = 'image-3'; // 이미지 3에 해당하는 클래스
        break;
      case 4:
        imagePath = witch;
        imageClass = 'image-4'; // 이미지 4에 해당하는 클래스
        break;
      case 5:
        imagePath = ribbon;
        imageClass = 'image-5'; // 이미지 5에 해당하는 클래스
        break;
      case 6:
        imagePath = crown;
        imageClass = 'image-6'; // 이미지 6에 해당하는 클래스
        break;
      default:
        console.log('유효하지 않은 imageSrc 값입니다.');
        return; // 유효하지 않은 경우 함수 종료
    }
  
    // 이미지가 이미 보여지고 있는 경우 해당 이미지를 숨김
    if (isImageVisible) {
      const imageToRemove = document.getElementById(`image-${imageSrc}`);
      if (imageToRemove) {
        shopElement.removeChild(imageToRemove);
        localStorage.removeItem('lastImageId'); // 로컬 스토리지에서 해당 이미지 아이디 제거
      }
      return;
    }
  
    imageSelected.src = imagePath;
    imageSelected.classList.add('img-custom-style');
    imageSelected.classList.add(imageClass); // 고유한 클래스 추가
  
    // 이전 이미지가 존재하면 제거
    const lastImageId = localStorage.getItem('lastImageId');
    if (lastImageId) {
      const lastImageElement = document.getElementById(lastImageId);
      if (lastImageElement) {
        shopElement.removeChild(lastImageElement);
        changeClothes();
      }
    }
  
    // 새로운 이미지를 Shop 페이지에 출력
    const newImageId = `image-${imageSrc}`;
    imageSelected.id = newImageId;
    imageSelected.classList.add(`image-${imageSrc}`); // 클래스 추가
    shopElement.appendChild(imageSelected);
  
    // 마지막 이미지를 현재 이미지로 업데이트
    localStorage.setItem('lastImageId', newImageId);
    console.log(imageSelected);
    changeClothes(imageSrc);

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

      <div className="title_shop">
        상점
      </div>

      <div className="chick4">
        <img src={chick4} className="chick4" />
      </div>

      <div className="pannelImage">
        <img src={pannel} className="pannel_shop" />
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
                구매 확인
                <p>'{currentItem?.name}'을(를) {currentItem?.price}원에 구매하시겠습니까?</p>
                <div className="modal-buttons">
                  <button onClick={confirmPurchase}>확인</button>
                  <button onClick={cancelPurchase}>취소</button>
                </div>
              </>
            ) : (
              <>
                <div className='modal-denied'>
                <h2>포인트 부족</h2>
                <p>포인트가 부족하여 구매할 수 없습니다.</p>
                <div className="modal-buttons">
                  <button onClick={() => setModalIsOpen(false)}>확인</button>
                </div>
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
