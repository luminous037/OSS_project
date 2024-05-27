import React, { useState, useEffect } from 'react';
import './cloud.css';
import cloudImage from '../image/cloud3.png';



function Cloud({ onRain }) {
    /*구름 퍼센테이지 관리*/
    const [percentage, setPercentage] = useState();
    /* 위의 똑같은 내용이 alarmPage.js에도 있는데 알람페이지에서 clear를 눌렀을 경우에도 구름 퍼센테이지가 저장되게 하기위해서*/

    useEffect(() => {
      fetch('/userProfile')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched user data:', data); // 서버에서 받은 데이터 출력
        const userCloud = parseInt(data[0].cloud, 10);
        setPercentage(userCloud);
      })
      .catch(error => {
          console.error('유저 정보를 가져오는 중 에러:', error);
      });
    }, []);

  /*구름을 클릭했을 경우 퍼센테이지가 상승함 최대 100*/
  const handleClearClick = () => {
    setPercentage(prev =>{
      const newPercent=Math.min(prev + 35, 100)
      updateCloud(newPercent);
      return newPercent;
    });
  };

  const updateCloud = (newPercent) => {
    fetch(`http://localhost:4000/cloudUpdate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(({ cloudPercent: newPercent }))
    })
    .then(() => {
    })
    .catch(err => {
      console.error('rainUpdate중 오류: ', err);
    });
  };


  /*퍼센테이지가 100%가 되었을 때 구름을 클릭했을 경우 발생하는 상황들*/
  const handleCloudClick = () => {
    if (percentage === 100) {
      const cloudElement = document.querySelector('.cloud');
      /*비가 내리는 애니메이션이 나타남*/
      cloudElement.classList.add('rain-animation');
      setTimeout(() => {
        /*비가 내리는 애니메이션이 없어짐*/
        cloudElement.classList.remove('rain-animation');
        /*퍼센테이지를 0으로 초기화함*/
        setPercentage(0);
        updateCloud(0);
        onRain();
      }, 3000); // 애니메이션 지속 시간과 일치하도록 설정
    }
  };


  return (
    <div className="App">
      <button className="what" onClick={handleClearClick}>✨ Have a nice day ✨</button>
      <div className="cloud" onClick={handleCloudClick}>
        <img src={cloudImage} alt="Cloud" />
        <div className="cloud-percentage">{percentage}%</div> 
      </div>
    </div>
  );

}

export default Cloud;