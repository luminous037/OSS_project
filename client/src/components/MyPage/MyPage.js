import './MyPage.css'
import {useState, useRef, useEffect} from 'react';
import { Link} from 'react-router-dom';
import Switch from 'react-switch';
import { createPortal } from 'react-dom';
import MyPageData from './MyPageData';

function MyPage() {  //마이페이지 기본 틀

  const [userData, setUserData] =useState({ //유저 정보

    userName:'',
    alaram: false

  }); 
  
  const [newName, setNewName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  useEffect(() => { //유저 정보 불러오기
    fetch('/userProfile')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const userData = {
            userName: data[0].userName,
            alaram: data[0].alaram
          };
          console.log(userData);
          setUserData(userData);
        }
      })
      .catch(error => {
        console.error('유저 정보를 가져오는 중 에러:', error);
      });
  }, [userData]);
 

  const handleChange = (checked) => { //알람 설정 변경
    setUserData(prevUserData => ({
      ...prevUserData,
      alaram: checked
    }));
  };

  const nameChange= () =>{ //이름 변경
    fetch('http://localhost:4000/updateName', {
      method: 'POST',
      headers: {
          credentials: 'include',
          'Content-Type': 'application/json' // JSON 형식으로 전송
      },
      body: JSON.stringify({ currentName: userData.userName, updatedName: newName })
    }).then(response =>{
      if (response.ok) {
        setModalOpen(false)
      }
    })
    .catch(err => {
       console.error('namePost 중 오류: ',err);
    });
  }
  
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
            <div className="profile_input">
              <h2>{userData.userName}</h2>
            </div>
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
                  <input className="modal_input"  onChange={e => setNewName(e.target.value)}></input>
                  <button className={'modal_close_button'} onClick={() => nameChange()}>
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
          <Switch onChange={handleChange} checked={userData.alaram}  onColor="#8CD7F2" className="switch" />
          </div>
        </div>

        <div className="medicine_title">
          <h2 className="title">약 목록</h2>
        </div>
        
        <MyPageData/>

        <div  className="add_list_button">
          <Link to="./AddMedi" style={{ textDecoration: 'none'}} >
            <img src="/addButton.png" alt="Add Button"/>
            </Link>
        </div>

      </div>
  )
}



export default MyPage;
