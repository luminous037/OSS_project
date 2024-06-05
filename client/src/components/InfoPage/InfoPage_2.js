import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './InfoPage_2.css';

function InfoPage_2() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userID = searchParams.get('userID'); // 쿼리 파라미터로부터 id 값을 가져옴

  const [mediData, setMediData] = useState({ // 기본 데이터 저장 구조
    mediName: '',
    time: {},
    date: '',
    detail: {
      morning: true,
      afternoon: true,
      evening: true,
      before: false,
      after: false,
      time: ''
    }
  });

  const [childName, setUserName] = useState('');

  useEffect(() => {  // 이름 출력
    fetch('/userProfile')
      .then(response => response.json())
      .then(data => {
        const userName = data.map(user => user.userName);     // 받은 데이터에서 이름만 추출
        setUserName(userName);
      })
      .catch(error => {
        console.error('유저 정보를 가져오는 중 에러:', error);
      });
  }, []);

  const handleInputChange = (event) => { // 약 이름 받기 처리
    const { name, value } = event.target;
    setMediData({
      ...mediData,
      [name]: value
    });
  };

  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const fetchData = (data) => { // 데이터 저장
    fetch('http://localhost:4000/addList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        const id = data._id;
        navigate(`/InfoPage_1/InfoPage_2/InfoPage_3?mediID=${id}&userID=${userID}`); // 저장 후 페이지 이동
      })
      .catch(err => {
        console.error('fetchData 중 오류: ', err);
      });
  };

  const dataSave = () => { // medidata 복용법 수정
    const infoData = {
      morning: buttonStates.morning,
      afternoon: buttonStates.afternoon,
      evening: buttonStates.evening,
      before: checkBox.before,
      after: checkBox.after,
      time: time
    }
    const updatedMediData = {
      ...mediData,
      detail: infoData
    };
    setMediData(updatedMediData);
    console.log("약 정보: ", updatedMediData); // 업데이트된 mediData 객체를 콘솔에 출력
    fetchData(updatedMediData); // 저장과 함께 이동
  };

  const [buttonStates, setButtonStates] = useState({ // 아침 점심 저녁
    morning: true,
    afternoon: true,
    evening: true
  });

  const toggleButton = (buttonName) => {
    setButtonStates(prevState => ({
      ...prevState,
      [buttonName]: !prevState[buttonName]
    }));
  };

  const [checkBox, setCheckBox] = useState({  // 식 전후
    before: false,
    after: false
  });

  const toggleCheckBox = (checkBoxName) => {
    setCheckBox({
      before: checkBoxName === 'before',
      after: checkBoxName === 'after'
    });
  };

  // 시간 입력을 위한 상태와 상태 변경 함수
  const [time, setTime] = useState('');

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  useEffect(() => {
    const validateForm = () => {
      const isMediNameFilled = mediData.mediName.trim() !== '';
      const isTimeFilled = time.trim() !== '';
      const isDateFilled = mediData.date.trim() !== '';
      const isCheckboxChecked = checkBox.before || checkBox.after;

      return (isMediNameFilled && isDateFilled && (isTimeFilled || isCheckboxChecked));
    };

    setIsNextButtonDisabled(!validateForm());
  }, [mediData.mediName, time, mediData.date, checkBox]);

  const areInputsDisabled = time.trim() !== '';

  const handleDateChange = (e) => {
    const { value } = e.target;
    if (value === '' || (Number(value) > 0 && Number(value) <= 31)) {
      setMediData({ ...mediData, date: value });
    }
  };

  return (
    <div className="Page2">
      <div className="title_info">
        MeddyBaby
      </div>

      <div className="background2">
      </div>

      <div className='child_name'>
        {childName}
      </div>

      <div className="nameofpill">
        <label>
          약 이름:
          <input
            type="text"
            name="mediName"
            value={mediData.mediName}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="buttons">
        <div className="morning">
          <button
            onClick={() => toggleButton('morning')}
            style={{
              backgroundColor: areInputsDisabled ? '#D3D3D3' : buttonStates.morning ? '#87CEEB' : 'white',
              color: areInputsDisabled ? 'gray' : buttonStates.morning ? 'white' : '#87CEEB',
              border: '2px solid #87CEEB',
              borderRadius: '30px',
              padding: '10px 10px',
              fontSize: '25px'
            }}
            disabled={areInputsDisabled}
          >
            아침
          </button>
        </div>

        <div className="lunch">
          <button
            onClick={() => toggleButton('afternoon')}
            style={{
              backgroundColor: areInputsDisabled ? '#D3D3D3' : buttonStates.afternoon ? '#87CEEB' : 'white',
              color: areInputsDisabled ? 'gray' : buttonStates.afternoon ? 'white' : '#87CEEB',
              border: '2px solid #87CEEB',
              borderRadius: '30px',
              padding: '10px 10px',
              fontSize: '25px'
            }}
            disabled={areInputsDisabled}
          >
            점심
          </button>
        </div>

        <div className="dinner">
          <button
            onClick={() => toggleButton('evening')}
            style={{
              backgroundColor: areInputsDisabled ? '#D3D3D3' : buttonStates.evening ? '#87CEEB' : 'white',
              color: areInputsDisabled ? 'gray' : buttonStates.evening ? 'white' : '#87CEEB',
              border: '2px solid #87CEEB',
              borderRadius: '30px',
              padding: '10px 10px',
              fontSize: '25px'
            }}
            disabled={areInputsDisabled}
          >
            저녁
          </button>
        </div>
      </div>

      <div className="checkbox">
        <div className="after">
          <input
            type="checkbox"
            checked={checkBox.after}
            onChange={() => toggleCheckBox('after')}
            disabled={areInputsDisabled}
          />
          <label style={{ color: areInputsDisabled ? 'gray' : '#3995b9' }}>식후 30분</label>
        </div>

        <div className="before">
          <input
            type="checkbox"
            checked={checkBox.before}
            onChange={() => toggleCheckBox('before')}
            disabled={areInputsDisabled}
          />
          <label style={{ color: areInputsDisabled ? 'gray' : '#3995b9' }}>식전 30분</label>
        </div>
      </div>

      <div className="date">
        <input
          type="number"
          min="1"
          max="31"
          value={mediData.date}
          onChange={handleDateChange}
          placeholder="최대31"
        />
        일 동안 복용
      </div>

      <div className="timeset">
        매
        <input
          type="text"
          value={time}
          onChange={handleTimeChange}
          placeholder="시간 입력"
        />
        시간마다 의사 지시대로
      </div>

      <div className="navigator">
        <button onClick={dataSave} className="nav-item" disabled={isNextButtonDisabled}>다음</button>
      </div>
      <div className='navigator-back'>
      <button onClick={navigateBack}>이전</button>
      </div>
    </div>
  );
}

export default InfoPage_2;
