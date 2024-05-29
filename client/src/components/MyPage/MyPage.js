import './MyPage.css'
import {useState, useRef, useEffect} from 'react';
import { Link} from 'react-router-dom';
import Switch from 'react-switch';
import { createPortal } from 'react-dom';
import MyPageData from './MyPageData';

function MyPage() {  //마이페이지 기본 틀

  const [userData, setUserData] =useState({ //유저 정보

    userName:'',
    alarm: false

  }); 

  const [ newData, setNewData] =useState({ //바뀐 내용 저장
    newName:'',
    alarmChange: false
  });

  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  useEffect(() => { //유저 정보 불러오기
    fetch('/userProfile')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const Data = {
            userName: data[0].userName,
            alarm: data[0].alarm
          };
          console.log(Data);
          setUserData(Data);
          setNewData(prev=>({...prev, newName:Data.userName, alarmChange:Data.alarm}))
        }
      })
      .catch(error => {
        console.error('유저 정보를 가져오는 중 에러:', error);
      });
  },[]);

  const updateUserData = () =>{ //데이터 업데이트

    setUserData(prev=>({...prev, userName:newData.newName, alarm:newData.alarmChange}));
    
    fetch('http://localhost:4000/updateData', {
      method: 'POST',
      headers: {
          credentials: 'include',
          'Content-Type': 'application/json' // JSON 형식으로 전송
      },
      body: JSON.stringify(newData) //바뀐 내용을 전달
    })
    .then(()=>{
    })
    .catch(err => {
       console.error('userDataUpdate 중 오류: ',err);
    });
  }


  useEffect(() => { // update userData when newData.alarmChange changes
    setUserData(prev => ({ ...prev, alarm: newData.alarmChange }));
  }, [newData.alarmChange]);

  const handleChange = (checked) => { //알람 설정 변경
    setNewData(prevData => ({
      ...prevData,
      alarmChange: checked
    }));
  };
  
  const handleModalSave = ()=>{ //수정할 이름을 작성한 후 저장 버튼을 누를 시
    updateUserData(); //데이터 업데이트
    setModalOpen(false);
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
            <h3>우리 아이 이름</h3>
            <div className="profile_input">
              <div className='userName'>{userData.userName}</div>
            </div>
              <h4>
              <button className="profile_input_button" onClick={() => setModalOpen(true)}>수정</button>
              </h4>
          </div>
          <>
            { //이름 수정 모달
              createPortal(
              modalOpen && (
              <div className={'modal_container'} ref={modalBackground} onClick={e => {
                if (e.target === modalBackground.current) {
                  setModalOpen(false);
                }
                }}>
                <div className={'modal_content'}>
                  <h3 className={'modal_text'}>이름 수정</h3>
                  <input className="modal_input" onChange={e => setNewData(prevData => ({...prevData, newName: e.target.value }))}></input>
                  <button className={'modal_close_button'} onClick={() => handleModalSave()}>
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
          <div className="button_alarm_myPage"><Switch onChange={handleChange} checked={userData.alarm}  onColor="#8CD7F2" className="switch" />
          </div></div>
        </div>

        <div className='MedicineList'>
        <div className="medicine_title">
          약 목록
        </div>
        
        <MyPageData/>

        <div  className="add_list_button">
          <Link to="./AddMedi" style={{ textDecoration: 'none'}} >
            <img src="/addButton.png" alt="Add Button"/>
            </Link>
        </div>
        </div>

      </div>
  )
}



export default MyPage;
