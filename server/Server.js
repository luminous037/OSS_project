const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { dbConnect, getDatabase } = require('./DbConnect');
const { ObjectId } = require('mongodb');


const port = process.env.PORT || 4000; //서버 포트 번호
const fs =require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());



app.listen(port, () => {
    console.log("listen") // 정상 작동
    dbConnect(); //DB 연결
}); 


app.post('/saveName', (req, res) => {
    const database = getDatabase();

    const userCollection = database.collection("user");
    const userName = req.body.userName;
  
    userCollection.insertOne({
      'userName': userName
    })
    .then((result) => {
      console.log(result);
      res.status(200).send('Success');
    })
    .catch((err) => {
      console.log('userName 삽입 중 에러: ', err);
    });
  });

  
app.get('/userProfile',(req,res)=>{
    const database=getDatabase();
    const userCollection = database.collection("user");

    userCollection.find({},{projection:{_id:0, userName:1}})
    .toArray()
    .then(result=>{
        res.send(result);
    }).catch(err=>{
        console.log("유저 정보 전달 중 오류: ",err);
    })
})


app.get('/list', (req, res) => {
    const database = getDatabase(); //db 가져오기
    const mediListcollection = database.collection("medicineList"); //컬렉션 참조

    mediListcollection.find({}, { projection: { _id: 1, mediName: 1 } }) // db내의 모든 mediName을 가져와서 queryResult에 저장
        .toArray()
        .then(queryResult => {
            res.send(queryResult);
        })
        .catch(err => {
            console.error("약 목록 조회 오류: ", err);
        });
});

app.delete('/delete_list/:id', (req,res)=>{ //약 데이터 삭제
    const id = req.params.id;

    const database = getDatabase(); //db 가져오기
    const mediListcollection = database.collection("medicineList"); //컬렉션 참조
    console.log( "현재 id: ", id);


    mediListcollection.deleteOne({ _id: new ObjectId(id)})
    .then(()=>{
        res.status(200).send('Success');
        return userCollection.updateOne( //userCollection에서도 삭제
            { "medicineLists": new ObjectId(id) },
            { $pull: { "medicineLists": new ObjectId(id) } }
        );
    })
    .catch((err)=>{
        console.log("삭제 오류: ", err, "현재 id: ", id);
    })

})


app.post('/addList', (req, res)=>{ //약 추가할 때
    const database = getDatabase();

    const mediListCollection = database.collection("medicineList"); //컬렉션 참조
    const userCollection = database.collection("user");


    const {mediName, time, detail}=req.body;
    mediListCollection.insertOne({ //db에 내용 삽입
        'mediName' : mediName,
        'time' : time,
        'detail' : detail
    })        
    .then((result) => { //데이터 확인
        console.log(result);

        var medicineListObjectId = result.insertedId;

        return userCollection.updateOne(
            {"_id": userId},
            {$push: {"medicineLists": medicineListObjectId}}
        );
    })
    .then(()=>{
        res.status(200).send('Success');
    })
    .catch((err) => { //에러 발생 시
    console.error("약 추가 중 오류: ", err);
    });

})




