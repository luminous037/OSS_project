import { useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {AddInfo} from './PageCanvas';

function AddMedi() {
    
    const [mediData, setMediData] = useState({ //약 정보 저장할 배열
        mediName: '',
        time: '',
        detail: ''
    });


    const navigate=useNavigate();
    const saveDetail=()=>{ //저장 후 마이페이지 이동
        navigate('/MyPage');
    };

    const fetchData = () => { // fetch 요청 함수
        fetch('http://localhost:4000/addList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // JSON 형식으로 전송
            },
            body: JSON.stringify(mediData) // 약 정보를 body에 저장
            
        })
        .then( ()=>{saveDetail();})
        .catch(err => {
            console.error('fetchData 중 오류: ',err);
        });
    };

    const handleChange = (e) => { //데이터 입력 시
        setMediData({
            ...mediData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="detailPage">

        <div className="detail_top">
          <h1>상세 정보</h1>
          <br></br>
        </div>
        <div className="detail_list">
            <div className="detail_text">
                <h2>먹는 약</h2>
                <input type="text" name="mediName" value={mediData.mediName} onChange={handleChange} />
            </div>
                <br></br>
            <div className="detail_text">
                <h2>설정한 시간</h2>
                <input type="text" name="time" value={mediData.time} onChange={handleChange} />
            </div>
                <br></br>
            <div className="detail_text_no-border">
                <h2>복용법</h2>
                <AddInfo/>
            </div>
        </div>
    
        <button onClick={fetchData} className="save_button" ><h2>저장</h2></button>
    </div> 
    );
}

export default AddMedi;