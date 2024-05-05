const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { dbConnect, getDatabase } = require('./DbConnect');
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 4000; //서버 포트 번호
const fs =require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


app.listen(port, () => {
    console.log("listen") // 정상 작동
    dbConnect(); //DB 연결
}); 


// function mediShow(){ //약 목록이 보여야 할 때 -> mypage 들어갈 때, 약 목록 갱신될 때 -> 약 추가하거나 삭제했을 때
    
//     const database = getDatabase(); //db 가져오기

//     const mediListcollection = database.collection("medicineList"); //약의 이름, 복용 시간 등

//     // db내의 모든 mediName을 가져와서 queryResult에 저장
//     mediListcollection.find({}, { projection: { _id: 0, mediName: 1 } }).toArray()
//         .then((queryResult) => {
//             app.get('/list', (req, res) => { //list 경로에 있는 약 목록
//                 res.send(queryResult) //json형태로 변경 후 전송
//             });
//         })
//         .catch((err) => {
//             console.error('mediShow Error: ',err);
//         });
// }

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

    const mediname = req.body.mediName;
    const time = req.body.time;
    const detail = req.body.detail;

    mediListcollection.insertOne({ //db에 내용 삽입
        'mediName' : mediname,
        'time' : time,
        'detail' : detail
        })        
        .then((result) => {
            console.log(result);
        })
    .catch((err) => { //에러 발생 시
        console.error("약 추가 중 오류: ", err);
    });

})




