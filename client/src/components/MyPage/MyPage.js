import './MyPage.css'
import {useState} from 'react';
import { Link } from 'react-router-dom';
import {useEffect} from 'react';
import Switch from 'react-switch';
import {useNavigate} from 'react-router-dom';




function CallList() { //마이페이지 내용 불러옴
  
  const [medicine, setMedicine] = useState(""); //약 이름 넣기

  const navigate=useNavigate();

  const goDetailPage=()=>{ //상세 페이지 이동
  navigate('/DetailPage');
  };

  const dataDelete=(index,e)=>{ //삭제
    
  };

  useEffect(() => {
    callApi()
      .then(res => setMedicine(res))
      .catch(err => console.log('callApi오류: ',err)); //에러
  }, []);

  const callApi = async () => { //비동기적으로 작동
    const response = await fetch('http://localhost:4000/list'); //접속하고자 하는 주소
    const body = await response.json(); //해당 주소 내용을 body에 저장
    return body;
  }

  return( //출력
    <div>
      {medicine && (
        <ul className="list_setting">
          {medicine.map((item, index) => (
              <button onClick={goDetailPage} className="medicine_list" >
                <li key={index}>
                  <h4 className="name_setting">{item.mediName}
                    <button className="delete_button" onClick={(e)=>{
                    console.log('데이터 삭제');
                    e.stopPropagation(); //handClick이 실행되지 않도록
                    dataDelete(index,e);
                    }}></button>
                  </h4>
                </li>
              </button>
          ))}
        </ul>
      )}
    </div>
  )
}


function MyPage() {  //마이페이지 기본 틀

  const [alarmChecked, setAlarmChecked] = useState(false); //알람 설정 on/off 저장

  const handleChange = (checked) => {
    setAlarmChecked(checked);
  };
  
  return (

      <div className="myPage">

        <div className="myPage_top">
          <h1></h1>
        </div>

        <div className="profile">
          <br></br>
          <img className="profile_image" src="/myPage_profile1.png" alt="profile"/>
          <div  className="text_setting">
            <h1>이름</h1>
            <input className="profile_input"></input>
              <button className="profile_input_button">수정</button>
          </div>

          <br></br>
          <div className="text_setting"><h2 >알람 설정</h2>
          <Switch onChange={handleChange} checked={alarmChecked}  onColor="#8CD7F2" className="switch" />
          </div>
          
          
        </div>

        <div className="medicine_title">
          <h2 className="title">약 목록</h2>
        </div>

        <CallList/>

        <div  className="add_list_button">
          <Link to="./AddMedi" style={{ textDecoration: 'none'}} >
            <img src="/addButton.png" alt="Add Button"/>
            </Link>
        </div>

      </div>
  )
}



export default MyPage;
