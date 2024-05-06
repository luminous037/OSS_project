import './DetailPage.css';
import {useState} from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function DetailPage(){

    const navigate=useNavigate();
    const saveDetail=()=>{ //저장 후 마이페이지 이동
        navigate('/MyPage');
    };
      

return(
    <div className="detailPage">

        <div className="detail_top">
          <h1>상세 정보</h1>
          <br></br>
        </div>
        <div className="detail_list">
            <div className="detail_text">
                <h2>먹는 약</h2>
                <h4>수정 가능<input></input></h4>
            </div>
                <br></br>
            <div className="detail_text">
                <h2>설정한 시간</h2>
                <h4>수정 가능<input></input></h4>
            </div>
                <br></br>
            <div className="detail_text_no-border">
                <h2>복용법</h2>
                <h4>수정 가능<input></input></h4>
                <h4>수정 가능<input></input></h4>
                <h4>수정 가능<input></input></h4>
            </div>
        </div>

        <button onClick={saveDetail} className="save_button" ><h2>저장</h2></button>

    </div>
)
}

export default DetailPage;