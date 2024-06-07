import './DetailPage.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function PageCanvas({ id }) {
  const [loading, setLoading] = useState(true);
  const [mediData, setMediData] = useState({
    mediName: '',
    time: {},
    detail: {
      morning: true,
      afternoon: false,
      evening: false,
      before: false,
      after: false,
      time: ''
    }
  });

  const [timeSettings, setTimeSettings] = useState({ //알람 시간
    ampm1: 'AM',
    hour1: 9,
    minute1: 0,
    ampm2: 'PM',
    hour2: 12,
    minute2: 0,
    ampm3: 'PM',
    hour3: 6,
    minute3: 0,
});

const [buttonStates, setButtonStates] = useState({ //아침 점심 저녁
  morning: false,
  afternoon: false,
  evening: false 
});

  const navigate = useNavigate();

  const goToMypage = () => {
    navigate('/MyPage');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await callApi(); //
        if (Array.isArray(res) && res.length > 0) {
          setMediData(res[0]); // 배열의 첫 번째 요소를 사용
        } else {
          setMediData(res);
        }
        console.log(res);
        setLoading(false); // 데이터 로딩 완료 후 로딩 상태를 false로 설정
      } catch (err) {
        console.log("클라이언트에서 약 불러오기 중: ", err);
      }
    };

    fetchData();
  }, [id]);

  const callApi = async () => {
    const response = await fetch(`http://localhost:4000/list/${id}`);
    const body = await response.json();
    return body;
  };


  useEffect(() => { //mediData 업데이트 확인용
    console.log(mediData);
  }, [mediData, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
   //info2에서 설정한 아침 점심 저녁이 true일 경우 알람 설정 버튼을 추가하는 함수
   const renderButtonIfTrue = (condition, buttonId) => {
    if (condition) {
        return (
            <div key={buttonId}>
                <button >
                    {`(${timeSettings[`ampm${buttonId}`]} ${timeSettings[`hour${buttonId}`]}:${timeSettings[`minute${buttonId}`]})`}
                </button>
            </div>
        );
    }
    return null;
};
  return (
    <div className="detailPage">
      <div className="detail_top">
        <h1>
          상세 정보{' '}
          <button className="back_button" onClick={goToMypage}>
            <img className="backButton_img" src="/backButton.png" alt="back Button" />
          </button>
        </h1>
        <br />
      </div>
        <div className="which-medi">
          <h10>먹는 약</h10>
          <br></br>
          <h11>{mediData.mediName}</h11>
        </div>
        <br />
        <div className="alarm-set-time">
          <h10>설정한 시간</h10>

          <div className='alarm-set-button'>
          {renderButtonIfTrue(buttonStates.morning, 1)}
          {renderButtonIfTrue(buttonStates.afternoon, 2)}
          {renderButtonIfTrue(buttonStates.evening, 3)}

          {mediData.detail.morning && ( //조건부 렌더링
           <h4>{mediData.time.ampm1} {mediData.time.hour1} : {mediData.time.minute1}</h4>
          )}
          {mediData.detail.afternoon &&(
            <h4>{mediData.time.ampm2}  {mediData.time.hour2} : {mediData.time.minute2}</h4>
          )}
          {mediData.detail.evening && (
            <h4>{mediData.time.ampm3}  {mediData.time.hour3} : {mediData.time.minute3}</h4>
          )} 
          
          </div>
          
        </div>
        <br />
        <div className="detail_text_no-border">
          <h2>복용법</h2>
          <AddInfoCanvas medidetail={mediData.detail} />
        </div>
    </div>
  );
}

function AddInfoCanvas({ medidetail }) {
  const [buttonStates, setButtonStates] = useState({
    morning: true,
    afternoon: true,
    evening: true,
  });

  const [checkBox, setCheckBox] = useState({
    before: false,
    after: true,
  });

  const [time, setTime] = useState('');

  useEffect(() => {
    if (medidetail) {
      setButtonStates({
        morning: medidetail.morning,
        afternoon: medidetail.afternoon,
        evening: medidetail.evening,
      });
      setCheckBox({
        before: medidetail.before,
        after: medidetail.after,
      });
      setTime(medidetail.time);
    }
  }, [medidetail]);

  return (
    <div>
      <button
        style={{
          backgroundColor: buttonStates.morning ? '#87CEEB' : 'white',
          color:  buttonStates.morning ? 'white' : '#87CEEB',
          border:  buttonStates.morning ? '2px solid #87CEEB' : '2px solid #87CEEB',
        }}
      >
        아침
      </button>

      <button
        style={{
          backgroundColor: buttonStates.afternoon ? '#87CEEB' : 'white',
          color:  buttonStates.afternoon ? 'white' : '#87CEEB',
          border:  buttonStates.afternoon ? '2px solid #87CEEB' : '2px solid #87CEEB',
        }}
      >
        점심
      </button>

      <button
        style={{
          backgroundColor: buttonStates.evening ? '#87CEEB' : 'white',
          color:  buttonStates.evening ? 'white' : '#87CEEB',
          border:  buttonStates.evening ? '2px solid #87CEEB' : '2px solid #87CEEB',
        }}
      >
        저녁
      </button>
      <br />

      <input type="checkbox" checked={checkBox.after} readOnly />
      <label>식후 30분</label>

      <input type="checkbox" checked={checkBox.before} readOnly />
      <label>식전 30분</label>

      <br /> 매<input type="text" value={time} readOnly /> 시간마다 의사 지시대로
    </div>
  );
}

export { PageCanvas };