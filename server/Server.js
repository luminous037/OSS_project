const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const port = process.env.PORT || 4000; //서버 포트 번호
const fs =require('fs');

app.unsubscribe(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());


// MongoDB 연결 URI
const uri = "mongodb+srv://Gaudul:ab213466@meddybaby.plkzmsm.mongodb.net/";

// 클라이언트 생성
const client = new MongoClient(uri);


async function connect() {
    try {
        // 서버에 연결
        await client.connect();
        console.log("MongoDB에 연결");

        // 연결된 데이터베이스 및 컬렉션 참조
        const database = client.db("MeddyBabyDB");
        const mediListcollection = database.collection("medicineList");

        // 새로운 내용 삽입, 이후 mypage에서 내용 받아올 것
        await mediListcollection.insertOne({
            'mediName' : '감기약',
            'time' : '18:00',
            'text' : 'hi'
        });

        // 쿼리 실행 및 결과 출력
        const queryResult = await mediListcollection.find({ 'mediName': '감기약' }).toArray();
        
        // 서버 실행
        app.get('/list', (req, res) => { //list 경로에 있는 약 목록
            res.send(queryResult) //json형태로 변경 후 전송
        });
        
        app.listen(port, () => console.log("listen")); // 정상 작동

    } catch (err) {
        console.error(err); // 에러
    // } finally {
    //     //연결 닫기
    //     await client.close();
    //     console.log("MongoDB 연결 종료");
    }
}


// 연결 함수 호출
connect();

