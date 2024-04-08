import './App.css';
import {useState} from 'react';
import './myPage.css'

function AddList(){ //이후 구현 예정
  console.log(1)
}


function MyPage() {
  let [medicineName, mediNameChange] =useState(['감기약','복통약' ]); // 약 이름 저장, 아마 이후에 연결리스트로 구현할 듯

  let medicineList = <div className="medicine_list"><p>{medicineName[0]}</p></div>  //약 저장 박스, + 누를 때마다 추가되면 됨
  

  return (
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

      {medicineList}

      <span onClick={ AddList }>➕</span>

    </div>
  )
}

function Modal(){
  return(
    <div className="modal">
      <h4> 약 이름 </h4>
    </div>
  )
}


export default MyPage;
