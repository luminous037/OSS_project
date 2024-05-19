import './MyPage.css'
import {useState} from 'react';
import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';


function DeleteReq(id){ //삭제 요청 처리

  const  deleteData= () => { // fetch 요청 함수
    fetch(`http://localhost:4000/delete_list/${id}`, {
        method: 'DELETE'
    })
    .then( ()=>{
      console.log('삭제 성공')

    })
    .catch(err => {
        console.error('data삭제 중 오류: ',err);
    });
};

 return deleteData;
}


function MyPageData() { //마이페이지 내용 불러옴
  
  const [medicine, setMedicine] = useState(""); //약 이름 넣기

  const navigate=useNavigate();

  const goDetailPage=(id)=>()=>{ //상세 페이지 이동
    navigate(`/DetailPage?id=${id}`);
  };

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

  const dataDelete = (id,e) => {
    const deleteData =DeleteReq(id); // 삭제 요청 보내기
    deleteData();
    setMedicine(prevMedicine => prevMedicine.filter(item => item._id !== id)) // UI에서 제거
    console.log(id);
  }

  console.log(medicine)
  
  return( //출력
   <div>
    {medicine && (
      <ul className="list_setting">
        {medicine.map((item, index) => (
           <button onClick={goDetailPage(item._id)} className="medicine_list" >
             <li key={index}>
               <h4 className="name_setting">{item.mediName}
                <button className="delete_button" onClick={(e)=>{
                 console.log('데이터 삭제');
                 e.stopPropagation(); //handClick이 실행되지 않도록
                  dataDelete(item._id,e);
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

export default MyPageData