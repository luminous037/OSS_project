const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { dbConnect, getDatabase } = require('./DbConnect');

const port = process.env.PORT || 4000; //서버 포트 번호
const fs =require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.listen(port, () => {
    console.log("listen") // 정상 작동
    dbConnect(); //DB 연결
}); 


app.get('/list', (req, res) => {
    const database = getDatabase(); //db 가져오기
    const mediListcollection = database.collection("medicineList"); //컬렉션 참조

    mediListcollection.find({}, { projection: { _id: 0, mediName: 1 } }) // db내의 모든 mediName을 가져와서 queryResult에 저장
        .toArray()
        .then(queryResult => {
            res.send(queryResult);
        })
        .catch(err => {
            console.error("약 목록 조회 오류: ", err);
        });
});


app.post('/addList', (req, res)=>{ //약 추가할 때
    const database = getDatabase();

    const mediListcollection = database.collection("medicineList"); //컬렉션 참조

    const {mediName, time, detail}=req.body;
    mediListcollection.insertOne({ //db에 내용 삽입
        'mediName' : mediName,
        'time' : time,
        'detail' : detail
        })        
        .then((result) => { //데이터 확인
            console.log(result);
        })
    .catch((err) => { //에러 발생 시
        console.error("약 추가 중 오류: ", err);
    });

})




