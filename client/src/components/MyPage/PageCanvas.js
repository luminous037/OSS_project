import './DetailPage.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function PageCanvas({ id }) {
  const [loading, setLoading] = useState(true);
  const [mediData, setMediData] = useState({
    mediName: '',
    time: '',
    detail: {
      morning: false,
      afternoon: false,
      evening: false,
      before: false,
      after: false,
      time: ''
    }
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
    console.log(loading);
  }, [mediData, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

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
      <div className="detail_list">
        <div className="detail_text">
          <h2>먹는 약</h2>
          <h4>{mediData.mediName}</h4>
        </div>
        <br />
        <div className="detail_text">
          <h2>설정한 시간</h2>
          <h4>{mediData.time}</h4>
        </div>
        <br />
        <div className="detail_text_no-border">
          <h2>복용법</h2>
          <AddInfoCanvas medidetail={mediData.detail} />
        </div>
      </div>
    </div>
  );
}

function AddInfoCanvas({ medidetail }) {
  const [buttonStates, setButtonStates] = useState({
    morning: false,
    afternoon: false,
    evening: false,
  });

  const [checkBox, setCheckBox] = useState({
    before: false,
    after: false,
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
          backgroundColor: buttonStates.morning ? 'rgb(88, 148, 218)' : 'white',
          color: buttonStates.morning ? 'white' : 'black',
        }}
      >
        아침
      </button>

      <button
        style={{
          backgroundColor: buttonStates.afternoon ? 'rgb(88, 148, 218)' : 'white',
          color: buttonStates.afternoon ? 'white' : 'black',
        }}
      >
        점심
      </button>

      <button
        style={{
          backgroundColor: buttonStates.evening ? 'rgb(88, 148, 218)' : 'white',
          color: buttonStates.evening ? 'white' : 'black',
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
