import '.././App.css';
import './MyPage.css'
import {useState} from 'react';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';
import Switch from 'react-switch';


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
            <button className="medicine_list">
            <li key={index}>
              <p >{item.mediName}
               <button className="delete_button"></button>
              </p>
            </li>
            </button>
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

  const [checked, setChecked] = useState(false); //알람 설정 on/off 저장

  const handleChange = (checked) => {
    setChecked(checked);
  };
  
  return (

      <div className="App">

        <div className="myPage">
          <h1></h1>
        </div>

        <div className="profile">
          <br></br>
          <div  className="name_setting">
            <h1>이름 <input className="profile_input"></input>
            <button className="profile_input_button">저장</button>
            </h1>
          </div>

          <br></br>
          <div className="alarm_setting"><h2 >알람 설정<Switch onChange={handleChange} checked={checked} className="switch" /></h2></div>
          
          
        </div>

        <div className="medicine_title">
          <h2 className="title">약 목록</h2>
        </div>
        <CallList/>

        <GoMediList />

      </div>
  )
}



export default MyPage;
