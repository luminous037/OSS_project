const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Gaudul:ab213466@meddybaby.plkzmsm.mongodb.net/"; // MongoDB 연결 URI
const port = process.env.PORT || 4000; //서버 포트 번호
const fs =require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


// 클라이언트 생성
new MongoClient(uri).connect().then( (client)=>{
    // 서버에 연결
    console.log("MongoDB에 연결")
    // 연결된 데이터베이스 및 컬렉션 참조
    const database = client.db("MeddyBabyDB");
    const mediListcollection = database.collection("medicineList"); //약의 이름, 복용 시간 등
    const player = database.collection("player"); //사용자 이름, 재화 등
    
    }).catch((err)=>{
        console.log(err);
})

app.listen(port, () => console.log("listen")); // 정상 작동


app.post('/addList', (req, res)=>{
    const mediname = req.body.mediname;
    const time = req.body.time;
    const detail = req.body.detail;

    mediListcollection.insertOne({
        'mediName' : mediname,
        'time' : time,
        'type' : detail
        }).then((client)=>{
        //const queryResult = mediListcollection.find({ 'mediName': '감기약' }).toArray();
    })

    // 데이터베이스 내의 모든 mediName을 가져와서 queryResult에 저장
    mediListcollection.find({}, { projection: { _id: 0, mediName: 1 } }).toArray()
        .then((queryResult) => {
            app.get('/list', (req, res) => { //list 경로에 있는 약 목록
                res.send(queryResult) //json형태로 변경 후 전송
            });
        })
        .catch((err) => {
            console.error(err);
        });
 }
)


// function mediShow() {
//     // 데이터베이스 내의 모든 mediName을 가져와서 queryResult에 저장
//     mediListcollection.find({}, { projection: { _id: 0, mediName: 1 } }).toArray()
//         .then((queryResult) => {
//             app.get('/list', (req, res) => { //list 경로에 있는 약 목록
//                 res.send(queryResult) //json형태로 변경 후 전송
//             });
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// }




//client.close(); //연결 닫기