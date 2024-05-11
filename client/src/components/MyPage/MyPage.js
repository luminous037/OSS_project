import './MyPage.css'
import {useState} from 'react';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import MyPageData from './MyPageData';


function MyPage() {  //마이페이지 기본 틀

  const [checked, setChecked] = useState(false); //알람 설정 on/off 저장

  const handleChange = (checked) => {
    setChecked(checked);
  };
  
  return (

      <div className="myPage">

        <div className="myPage_top">
          <h1></h1>
        </div>

        <div className="profile">
          <br></br>
          <div  className="text_setting">
            <h1>이름</h1>
            <input className="profile_input"></input>
              <button className="profile_input_button">저장</button>
          </div>

          <br></br>
          <div className="text_setting"><h2 >알람 설정</h2>
          <Switch onChange={handleChange} checked={checked}  onColor="#8CD7F2" className="switch" />
          </div>
          
          
        </div>

        <div className="medicine_title">
          <h2 className="title">약 목록</h2>
        </div>

        <MyPageData/>

        <div className="add_list_button">
          <Link to="./AddMedi" style={{ textDecoration: 'none' }}>➕</Link>
        </div>

      </div>
  )
}



export default MyPage;
