import './MyPage.css'
import {useState} from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import MyPageData from './MyPageData';
=======
import { Link} from 'react-router-dom';
import {useRef} from 'react';
import Switch from 'react-switch';
import { createPortal } from 'react-dom';
import { CallList } from './MyPageCP';
>>>>>>> 5acfc86cec436cbb1c79445c7a87b1bad547fd29


function MyPage() {  //마이페이지 기본 틀

  const [alarmChecked, setAlarmChecked] = useState(false); //알람 설정 on/off 저장

  const handleChange = (checked) => {
    setAlarmChecked(checked);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  
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
              <button className="profile_input_button" onClick={() => setModalOpen(true)}>수정</button>
          </div>
          <>
            { //이름 수정
              createPortal(
              modalOpen && (
              <div className={'modal_container'} ref={modalBackground} onClick={e => {
                if (e.target === modalBackground.current) {
                  setModalOpen(false);
                }
                }}>
                <div className={'modal_content'}>
                  <h3 className={'modal_text'}>이름 수정</h3>
                  <input className="modal_input"></input>
                  <button className={'modal_close_button'} onClick={() => setModalOpen(false)}>
                   저장
                  </button>
                </div>
              </div>
              ),
              document.body
            )}

          </>
          <br></br>
          <div className="text_setting"><h2 >알람 설정</h2>
          <Switch onChange={handleChange} checked={alarmChecked}  onColor="#8CD7F2" className="switch" />
          </div>
          
          
        </div>

        <div className="medicine_title">
          <h2 className="title">약 목록</h2>
        </div>
<<<<<<< HEAD

        <MyPageData/>
=======
        
        <CallList/>
>>>>>>> 5acfc86cec436cbb1c79445c7a87b1bad547fd29

        <div  className="add_list_button">
          <Link to="./AddMedi" style={{ textDecoration: 'none'}} >
            <img src="/addButton.png" alt="Add Button"/>
            </Link>
        </div>

      </div>
  )
}



export default MyPage;
