import '.././App.css';
import AddMedi from './AddMedi'
import './MyPage.css'
import {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';


function CallList() { //마이페이지 내용 불러옴

  const [medicine, setMedicine] = useState(""); //약 이름 넣기

  useEffect(() => {
    callApi()
      .then(res => setMedicine(res))
      .catch(err => console.log('error')); //에러
  }, []);

  const callApi = async () => { //비동기적으로 작동
    const response = await fetch('http://localhost:4000/list'); //접속하고자 하는 주소
    const body = await response.json(); //해당 주소 내용을 body에 저장
    return body;
  }

  return( //출력
    <div>
      {medicine && (
        <ul>
          {medicine.map((item, index) => (
            <div>
            {/* <li key={index}>
              <p className="medicine_list">{item.mediName}</p>
            </li> */}
            <button className="delete_button"></button>
            </div>

          ))}
        </ul>
      )}
    </div>
  )
}

function GoMediList() { //+버튼 누를 시 약 추가 화면 이동
  return (
    <div>
    <Link to="./AddMedi" style={{ textDecoration: 'none' }}>➕</Link>
  </div>
  );
}

function MyPage() {  //마이페이지 기본 틀
  
  return (
    <Router>
      <Routes>
        <Route path="/AddMedi" element={<AddMedi />} />
      </Routes>
      <div className="App">

        <div className="myPage">
          <h1>마이페이지</h1>
        </div>

        <div className="profile">
          <br></br><br></br>
          <h1>이름 <input></input></h1> 
        </div>

        <div className="medicine_title">
          <h2>약 목록</h2>
        </div>
        <CallList/>

        <GoMediList />

      </div>
    </Router>
  )
}



export default MyPage;
