import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import './MyPage.css'


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

  export {CallList};