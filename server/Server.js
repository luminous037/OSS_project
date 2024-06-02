const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { dbConnect, getDatabase } = require('./DbConnect');
const { ObjectId } = require('mongodb');
const cookieParser = require('cookie-parser');
require('dotenv').config(); //환경 변수
const admin = require('./FireBase');
const port = process.env.PORT; //서버 포트 번호
const fs =require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

let user_id;
let token;

const firebaseConfig = { //firebase 설정 및 vapidKey
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  //vapidKey: process.env.VAPID_KEY
};

app.listen(port, () => {
    console.log("listen") // 정상 작동
    dbConnect(); //DB 연결
    //console.log(firebaseConfig);
}); 


app.get("/firebase-config", (req, res) => { //firebase 구성 정보 보냄
  res.json(firebaseConfig);
});

app.post("/subscribe", (req, res) => { //토큰 저장
    token = req.body;
   // console.log('토큰: ', token);
  res.status(200).send('토큰 저장 완료');
});
  

app.post('/saveName', (req, res) => { //infoPage_1 에서 이용, 이름 저장
    const database = getDatabase();

    const userCollection = database.collection("user");
    const userName = req.body.userName;
  
    userCollection.insertOne({
      'userName': userName, //유저 이름
      'alarm' : false, //알람 설정
      'points': 5000, //포인트
      'plant' : 0, //씨앗 심은 상태
      'rain': 0, //비 내린 횟수 = 씨앗 성장 상태
      'cloud': 0, //구름 퍼센티지
      'stamp': 0, //스탬프
      'mediListID':'', // 약 정보
      'itemID':'', //아이템 정보
    })
    .then((result) => {
      res.cookie('userId', result.insertedId, { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: true }); //쿠키 설정
      user_id=result.insertedId; //유저 id 설정
      res.send({ _id: result.insertedId})
    })
    .catch((err) => {
      console.log('userName 삽입 중 에러: ', err);
    });
  });

  app.post('/updateData', (req, res) => { //myPage에서 이용, 사용자 이름 및 알람 설정 변경사항 저장
    const database = getDatabase();
    const userCollection = database.collection("user");
    const { newName, alarmChange } = req.body;
  
    userCollection.updateOne(
      { _id: user_id }, // 기존 이름으로 문서 찾기
      { $set: { userName: newName
        , alarm: alarmChange   //현재 프록시 오류로 인해 잠시 주석 처리
        } } // 새로운 이름으로 업데이트
    )
    .then(() => {
      res.status(200).send('Success');
    })
    .catch((err) => {
      console.log('이름 업데이트 중 에러: ', err);
      res.status(500).send('Error');
    });
  });
  


app.get('/userProfile',(req,res)=>{ //사용자의 정보 불러옴
    const database=getDatabase();
    const userCollection = database.collection("user");

    //console.log(user_id);
    userCollection.find({_id: user_id},
      {projection:
        { _id:1,
          userName:1,
          alarm:1,
          points: 1,
          plant: 1,
          rain: 1,
          cloud: 1,
          stamp: 1,
          mediListID:1,
          itemID:1,
          seedID:1
        }})
    .toArray()
    .then(result=>{
        res.send(result);
    }).catch(err=>{
        console.log("유저 정보 전달 중 오류: ",err);
    })
})


app.get('/list', (req, res) => { //myPage 에서 이용, 사용자의 약 목록 불러옴
    const database = getDatabase(); //db 가져오기
    const mediListcollection = database.collection("medicineList"); //컬렉션 참조

    //const userId = req.cookies.userId;
    // if (!userId) {
    //     res.status(400).send('User ID not found in cookies');
    //     console.log('쿠키 없음');
    //     return;
    // }


    // userCollection.findOne({ _id: new ObjectId(user_id) }) //사용자 정보 찾기
    //     .then(user => {
    //         if (!user) {
    //             res.status(404).send('User not found');
    //             return;
    //         }

    //         const mediListIDs = user.mediListID; // 사용자 정보에서 mediListID 배열 가져오기

    //         if (!Array.isArray(mediListIDs) || mediListIDs.length === 0) {
    //             res.status(404).send('약 정보 못 찾음');
    //             return;
    //         }

    //         mediListcollection.find({ _id: { $in: mediListIDs.map(id => new ObjectId(id)) } }, { projection: { _id: 1, mediName: 1 } }) // mediListID 배열에 포함된 약 목록 찾기
    //             .toArray()
    //             .then(queryResult => {
    //                 res.send(queryResult); // 조회된 약 목록
    //             })
    //             .catch(err => {
    //                 console.error("약 목록 조회 오류: ", err);
    //                 res.status(500).send('Error retrieving medicine list');
    //             });
    //     })
    //     .catch(err => {
    //         console.error("사용자 조회 오류: ", err);
    //         res.status(500).send('Error retrieving user');
    //     });

    mediListcollection.find({ }, { projection: { _id: 1, mediName: 1 } }) // db내의 모든 mediName을 가져와서 queryResult에 저장
        .toArray()
        .then(queryResult => {
            res.send(queryResult);
        })
        .catch(err => {
            console.error("약 목록 조회 오류: ", err);
        });
});

app.get('/list/:id',(req,res)=>{ //Detail페이지에서 이용, 사용자가 작성한 약에 대한 정보 제공
    const id =req.params.id;
    const database = getDatabase(); //db 가져오기
    const mediListcollection = database.collection("medicineList"); //컬렉션 참조

    mediListcollection.find({ _id: new ObjectId(id) },{projection: {_id:0, mediName : 1, time : 1,date : 1, detail : 1}})
    .toArray()
    .then(queryResult=>{
        res.send(queryResult);
    })
    .catch(err=>{
        console.log("약 불러오기 실패: ",err);
    })
})

app.delete('/delete_list/:id', (req,res)=>{ // myPage에서 이용, 약 데이터 삭제

    const id = req.params.id;

    const database = getDatabase(); //db 가져오기
    const mediListcollection = database.collection("medicineList"); //컬렉션 참조
    console.log( "현재 id: ", id);


    mediListcollection.deleteOne({ _id: new ObjectId(id)})
    .then(() => {
      // return userCollection.updateOne(
      //     { mediListID: new ObjectId(id) },
      //     { $pull: { mediListID: new ObjectId(id) } } // mediListID 배열에서 id 제거
      // );
  })
    .catch((err)=>{
        console.log("삭제 오류: ", err, "현재 id: ", id);
    })

})


app.post('/addList', (req, res)=>{ //myPage에서 이용, 약 추가할 때 사용
    const database = getDatabase();

    const mediListCollection = database.collection("medicineList"); //컬렉션 참조
    const userCollection = database.collection("user");

    // const userId = req.cookies.userId; //쿠키에서 유저 아이디 추출
    let mediListId;
    const {mediName, time, date, detail}=req.body;

    // if (!userId) {
    //     res.status(400).send('User ID not found in cookies');
    //     console.log('쿠키 없음');
    //     return;
    // }

    mediListCollection.insertOne({ //db에 내용 삽입
        'mediName' : mediName,
        'time' : time,
        'date' :date,
        'detail' : detail
    })        
    .then((result) => { //데이터 확인
        console.log(result);

        mediListId = result.insertedId;

        // return userCollection.updateOne( //해당 유저의 약 목록에 추가
        //     { _id: new ObjectId(userId) },
        //     {$push: {"medicineLists": medicineListId}}
        // );
    })
    .then(()=>{
        res.send({ _id: mediListId}); // 생성된 _id 반환
    })
    .catch((err) => { //에러 발생 시
    console.error("약 추가 중 오류: ", err);
    });

})

app.post('/addAlarm', (req,res)=>{ //알람 설정
  const { mediID, userID, time, alarm } = req.body; // 요청 본문에서 데이터 추출
    const database = getDatabase(); //db 가져오기
    const mediListcollection = database.collection("medicineList"); //컬렉션 참조
    const userCollection = database.collection("user");

    const mediObjectId = new ObjectId(mediID);
    const userObjectId = new ObjectId(userID);

    mediListcollection.updateOne(
        { _id: mediObjectId}, // _id로 문서 찾기
        { $set: { time: time} } 
      ).then(()=>{
        userCollection.updateOne(
          { _id: userObjectId },
          { $set: { alarm: alarm}}
        )
      })
      .then(()=>{
        res.status(200).send('Success');
      })
      .catch((err)=>{
        console.log("알람 추가 중 오류:", err);
      })
})

app.post('/rainUpdate',(req,res)=>{ //비 내린 횟수
  const rainCount = req.body.rainCount;
  const database = getDatabase(); //db 가져오기
  const userCollection = database.collection("user");

  userCollection.updateOne(
    {_id:user_id},
    {$set: {rain: rainCount} }
  ).then(()=>{
    res.status(200).send('Success')
  }).catch((err)=>{
    console.log('rainCount 오류: ',err);
  })
})

app.post('/cloudUpdate',(req,res)=>{ //구름 퍼센트
  const cloud = req.body.cloudPercent;
  const database = getDatabase(); //db 가져오기
  const userCollection = database.collection("user");

  userCollection.updateOne(
    {_id:user_id},
    {$set: {cloud: cloud} }
  ).then(()=>{
    res.status(200).send('Success')
  }).catch((err)=>{
    console.log('rainCount 오류: ',err);
  })
})

app.post('/plantUpdate', (req,res)=>{
  const database =getDatabase();
  const userCollection = database.collection("user");

  const{plant, rain, point}=req.body;
  userCollection.updateOne(
    {_id:user_id},
    {$set: {plant: plant, rain: rain, points: point, }}
  ).then(()=>{
    res.status(200).send('Success')
  }).catch((err)=>{
    console.log('plant 오류: ', err);
  })
})


app.get('/item',(req,res)=>{
  const database=getDatabase();
  const userCollection=database.collection("user");
  const itemCollection=database.collection("item");

   userCollection.findOne({ _id: user_id }) //사용자 정보 찾기
        .then(user => {
            if (!user) {
                res.status(404).send('User not found');
                return;
            }

            const itemIDs = user.itemID;

            if (itemIDs==='') { //아이템이 비어있을 시
                res.status(404).send('아이템 정보 못 찾음');
                console.log('아이템 정보 없음')
                return;
            }
            itemCollection.findOne({ _id:itemIDs },
              {projection: {_id:0, '1' : 1,  '2' : 1, '3' : 1,  '4' : 1,  '5' : 1,  '6' : 1}})
              .then(queryResult=>{
                res.send(queryResult);
            })
            .catch(err=>{
                console.log("아이템 조회 실패: ",err);
            })
        })
        .catch(err => {
            console.error("사용자 조회 오류: ", err);
            res.status(500).send('Error retrieving user');
        })
    })

app.post('/updatePoint',(req,res)=>{
  const database=getDatabase();
  const userCollection=database.collection("user");
  const itemCollection=database.collection("item");

  const{ points, item }=req.body;
  console.log(req.body);
  userCollection.findOne({ _id: user_id}) //사용자 정보 찾기
  .then(user => {
      if (!user) {
          res.status(404).send('User not found');
          return;
      }

      userCollection.updateOne(
        {_id: user_id},
        {$set: {points: points}}
      ).catch((err)=>{
        console.log('point 저장 오류: ',err);
      });

      let itemIDs = user.itemID; //유저의 아이템ID

      if (itemIDs=== '') { //아이템이 비어있을 시
        itemCollection.insertOne(item)
        .then((result) => { //데이터 확인
          itemIDs = result.insertedId;
          return userCollection.updateOne( 
              { _id: user_id },
              {$set: {"itemID": itemIDs}}
          );
        })
      }
      else{
      itemCollection.updateOne( //현재 아이템 목록
        { _id: itemIDs },
         { $set: item })
         .then(()=>{
          res.status(200).send('Success')
        }).catch((err)=>{
          console.log('아이템 저장 오류: ', err);
        })
      }
  })
  .catch(err => {
      console.error("사용자 조회 오류: ", err);
      res.status(500).send('Error retrieving user');
  })

})