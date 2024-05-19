import './DetailPage.css';
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';

function PageCanvas({id}){ //detail에 나타나는 이미 저장된 값

  const [mediData, setMediData] = useState({ //기본 데이터 저장 구조
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

    const navigate=useNavigate();
    const goToMypage=()=>{ //저장 후 마이페이지 이동
        navigate('/MyPage');
    };

    const [loading, setLoading] = useState(true); // 로딩 상태 추가


    useEffect(() => {
      callApi()
        .then(res => {
          setMediData(res);
          setLoading(false); // 데이터 로드 완료 후 loading 상태 변경
        })
        .catch(err => {
          console.log("클라이언트에서 약 불러오기 중: ", err);
          setLoading(false); // 데이터 로드 실패 시 loading 상태 변경
        });
    }, [id]);


  useEffect(() => {
    console.log(mediData);
  }, [mediData]);

  
    const callApi = async () => { //비동기적으로 작동
      const response = await fetch(`http://localhost:4000/list/${id}`); //접속하고자 하는 주소
      const body = await response.json(); //해당 주소 내용을 body에 저장
      return body;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    return(
        <div className="detailPage">

        <div className="detail_top">
          <h1>상세 정보 <button className="back_button" onClick={()=>goToMypage()}>
            <img className="backButton_img" src="/backButton.png" alt="back Button"/></button>
          </h1>
          <br></br>
        </div>
        <div className="detail_list">
            <div className="detail_text">
                <h2>먹는 약</h2>
                <h4>{mediData.mediName}</h4>
            </div>
                <br></br>
            <div className="detail_text">
                <h2>설정한 시간</h2>
                <h4>{mediData.time}</h4>
            </div>
                <br></br>
            <div className="detail_text_no-border">
                <h2>복용법</h2>
                <AddInfoCanvas medidetail={mediData.detail}/>
            </div>
        </div>
    
    </div>
    )
}

function AddInfoCanvas({medidetail}){

  const [buttonStates, setButtonStates] = useState({
    morning: false,
    afternoon: false,
    evening: false,
  });
  
  const [checkBox, setCheckBox] = useState({
    before: false,
    after: false,
  })


    // 시간 입력을 위한 상태와 상태 변경 함수
    const [time, setTime] = useState('');

    useEffect(() => {      // detail이 존재할 때만 상태 설정을 진행
      if (medidetail) {
        setButtonStates({
          morning: medidetail.morning,
          afternoon: medidetail.afternoon,
          evening: medidetail.evening,
        });
        setCheckBox({ before: medidetail.before, after:medidetail.after });
        setTime(medidetail.time);
      }
    }, [medidetail]);

  
    return (
      <div>
        <button  style={{ backgroundColor: buttonStates.morning ? ' rgb(88, 148, 218)' : 'white', color: buttonStates.morning ? 'white' : 'black' }}>
          아침
        </button>

        <button  style={{ backgroundColor: buttonStates.afternoon ? ' rgb(88, 148, 218)' : 'white', color: buttonStates.afternoon ? 'white' : 'black' }}>
          점심
        </button>

        <button style={{ backgroundColor: buttonStates.evening ? ' rgb(88, 148, 218)' : 'white', color: buttonStates.evening ? 'white' : ' black' }}>
          저녁
        </button>
        <br />

        <input type="checkbox" checked={checkBox.after}/>
        <label>식후 30분</label>

        <input type="checkbox" checked={checkBox.before}/>
        <label>식전 30분</label>

        <br /> 매<input type="text" value={time}/>
        시간마다 의사 지시대로 

      </div>
    );
}


export {PageCanvas};
