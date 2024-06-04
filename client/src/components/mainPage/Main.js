import React, { useState, useEffect } from 'react';
import InstructionModal from './Guidebook.js';
import './Main.css';
import Cloud from './cloud.js';
import Seed from './seed.js';
import PresentCheckModal from './present_check.js'; // 출석체크 모달 컴포넌트 임포트
import moon from '../image/moon.png';
import sun from '../image/sun.png';
import bench from '../image/bench.png';
import star from '../image/star.png';
import cloud5 from '../image/cloud5.png';
import chicken from '../image/chicken.png';


const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rainCount, setRainCount] = useState(null);
  const [isMorning, setIsMorning] = useState(true);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false); //출석확인 모달창
  const [isAttendanceChecked, setIsAttendanceChecked] = useState(false); //출석 상태 확인
  const [stampCount, setStampCount] = useState(0); // 출석 횟수 상태 추가
  const [userId, setUserId] = useState(null); // 사용자 ID 상태 추가
  const [clothesId, setClotesId] = useState();

  useEffect(() => {
    fetch('/userProfile')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched user data:', data); // 서버에서 받은 데이터 출력
        const userRain = parseInt(data[0].rain, 10); // 정수로 변환  
        const PCheck = data[0].attendanceCheck;
        const stamp = data[0].stamp;
        const id = data[0]._id; // 스탬프에 제대로 전달하려고 추가
        const clothesId = data[0].clothes; 
        clothesId(clothesId);
        setRainCount(userRain);
        setStampCount(stamp); //DB 의 stamp 값을 코드에서 설정할 수 있도록
        setIsAttendanceChecked(PCheck); // 출석 상태 설정
        setIsAttendanceModalOpen(!PCheck); // 출석 상태에 따라 모달창 열기
        setUserId(id); // 사용자 ID 설정
      })
      .catch(error => {
        console.error('유저 정보를 가져오는 중 에러:', error);
      });
  }, []);

  useEffect(() => {
    if (rainCount === null) return;
    else updateRain(rainCount);
  }, [rainCount]);

  const handleRain = () => {
    if (rainCount >= 4) {
      setRainCount(0);
      updateRain(0);
    }
    setRainCount((prevCount) => {
      const newCount = prevCount + 1;
      updateRain(newCount);
      return newCount;
    });
    console.log(rainCount);
  };

  

  const updateRain = (newCount) => {
    fetch(`http://localhost:4000/rainUpdate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(({ rainCount: newCount }))
    })
      .then(() => {
        console.log('Rain count updated');
      })
      .catch(err => {
        console.error('rainUpdate중 오류: ', err);
      });
  };

  const presentCheck = (check) => { //출석상태 지정
    fetch(`http://localhost:4000/presentUpdate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(check)
    })
      .then(() => {
        console.log('출석체크: ', check.presentCount);
      })
      .catch(err => {
        console.error('presentUpdate중 오류: ', err);
      });
  };

  const handleStamp = () => { //스탬프 부여
    setStampCount((prevStampCount) => {
      const newCount = prevStampCount >= 5 ? 0 : prevStampCount + 1;
      giveStamp(newCount);
      return newCount;
    });
    console.log(stampCount);
  };

  const giveStamp = (count) => { //스탬프 불러오기
    fetch(`http://localhost:4000/stampUpdate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ stampCount: count, userId }) // userId를 함께 전송하도록 수정
    })
      .then(() => {
        console.log('present count updated');
      })
      .catch(err => {
        console.error('presentUpdate중 오류: ', err);
      });
  };

  
  useEffect(() => {
    setIsModalOpen(false);

    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 18) {
      setIsMorning(true);
    } else {
      setIsMorning(false);
    }
  }, []);

  const handleAttendanceCheck = () => {
    setIsAttendanceChecked((prev) => {
      const newCheck = !prev;
      presentCheck({ presentCount: newCheck }); // 모달창 초기화를 위한 출석체크 상태 저장
      return newCheck;
    }); //출석 체크 버튼이 비활성화되도록 하며, 사용자가 이미 출석 체크를 완료했음.
    setIsAttendanceModalOpen(false);
    handleStamp(); //스탬프 갯수 추가 함수 실행
  };

  const checkAttendanceState = () => {
    if (!isAttendanceChecked) {
      setIsAttendanceModalOpen(true);
    }
  };

  const phrases = [
    "안녕!",
    "좋은 하루 보내!",
    "약 먹는 멋진 어린이!",
    "오늘 기분 어때?",
    "만나서 반가워!"
  ];

  const showSelectImage = (imageSrc) => {
    const imageSelected = document.createElement('img');
    
    let imagePath = '';
    let imageClass = ''; // 이미지에 추가될 클래스
  
  
    switch (imageSrc) {
      case 1:
        imagePath = plant;
        imageClass = 'image-1-main'; // 이미지 1에 해당하는 클래스
        break;
      case 2:
        imagePath = santa;
        imageClass = 'image-2-main'; // 이미지 2에 해당하는 클래스
        break;
      case 3:
        imagePath = dragon;
        imageClass = 'image-3-main'; // 이미지 3에 해당하는 클래스
        break;
      case 4:
        imagePath = witch;
        imageClass = 'image-4-main'; // 이미지 4에 해당하는 클래스
        break;
      case 5:
        imagePath = ribbon;
        imageClass = 'image-5-main'; // 이미지 5에 해당하는 클래스
        break;
      case 6:
        imagePath = crown;
        imageClass = 'image-6-main'; // 이미지 6에 해당하는 클래스
        break;
      default:
        console.log('유효하지 않은 imageSrc 값입니다.');
        return; // 유효하지 않은 경우 함수 종료
    }
  
  
    imageSelected.src = imagePath;
    imageSelected.classList.add('img-custom-style');
    imageSelected.classList.add(imageClass); // 고유한 클래스 추가

  
    // 새로운 이미지를 Shop 페이지에 출력
    const newImageId = `image-${imageSrc}`;
    imageSelected.id = newImageId;
    imageSelected.classList.add(`image-${imageSrc}`); // 클래스 추가
    shopElement.appendChild(imageSelected);
  

  };

  const [currentPhrase, setCurrentPhrase] = useState('');

  useEffect(() => {
    changePhrase();
    const intervalId = setInterval(() => {
      changePhrase();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const changePhrase = () => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setCurrentPhrase(randomPhrase);
  };

  return (
    <div className={`mainpage-all-container ${isMorning ? 'morning-background' : 'night-background'}`}>
      <div className='mainpage-top-container'>
        <div className='logo-modal-container'>
          <div className='logo-sun-container'>
            <div className="stack-container">
              <h1>Meddy Baby</h1>
            </div>
            <img src={isMorning ? sun : moon} alt={isMorning ? "sun" : "moon"} className="sun" />
          </div>
          <img src={isMorning ? cloud5 : star} alt={isMorning ? "cloud4" : "star"} className="star" />
        </div>
        <img src={isMorning ? cloud5 : star} alt={isMorning ? "cloud5" : "star"} className="star1" />
        <div className='cloud-container'>
          <Cloud onRain={handleRain} />
          <img src={isMorning ? cloud5 : star} alt={isMorning ? "cloud5" : "star"} className="star3" />
        </div>
      </div>
      <div className='first-container'>
        <InstructionModal isOpen={isModalOpen} close={() => setIsModalOpen(false)} />
      </div>
      <div className='mainpage-middle-container'>
        <div className='bench-container'>
          <img src={bench} alt="bench" className="bench" />
        </div>
      </div>
      <div className='mainpage-bottom-container'>
        <div className='seed-container'>
          <Seed rainCount={rainCount} setRainCount={setRainCount} />
        </div>
        <div className='sign-container'></div>
      </div>
      <div className='chick-conainer'>
        <img src={chicken} alt="chicken" className="chicken" />
        <div className="balloon">
          <p>{currentPhrase}</p>
        </div>
      </div>
      <PresentCheckModal 
        isOpen={isAttendanceModalOpen} 
        onClose={() => setIsAttendanceModalOpen(false)}
        onPresentCheck={handleAttendanceCheck}
      />
      <div className='clothes'>
        <div key={item.id} className="item">
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
            />
          </div>
      </div>
    </div>

    

  );
};

export default MainPage;
