import { useState, useEffect } from 'react';

function AddMedi() {
    const [mediData, setMediData] = useState({ //약 정보 저장할 배열
        mediName: '',
        time: '',
        detail: ''
    });

    useEffect(() => { //post 요청
        fetch('http://localhost:4000/addList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' //JSON 형식으로 전송
            },
            body: JSON.stringify(mediData) //약 정보를 body에 저장
        })
        .then(response => {
            if (response.ok) { //서버 연결 성공 시
                return response.text();
            }
            throw new Error('서버 연결 실패');
        })
        .then(data => { //데이터 확인용
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        });
    }, []); //컴포넌트가 마운트될 때 한 번만 실행되도록 설정

    const handleChange = (e) => { //데이터 입력 시
        setMediData({
            ...mediData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <input type="text" name="mediName" value={mediData.mediName} onChange={handleChange} />
            <input type="text" name="time" value={mediData.time} onChange={handleChange} />
            <input type="text" name="detail" value={mediData.detail} onChange={handleChange} />
            <button onClick={() => console.log(mediData)}>확인</button>

            {/* mediData 값 확인 */}
            <div>
            <p>mediName: {mediData.mediName}</p>
            <p>time: {mediData.time}</p>
            <p>detail: {mediData.detail}</p>
            </div>
            
        </div>  
    );
}

export default AddMedi;
