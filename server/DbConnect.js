const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Gaudul:ab213466@meddybaby.plkzmsm.mongodb.net/"; // MongoDB 연결 URI
let database = null;

function dbConnect(){
    new MongoClient(uri).connect().then( (client)=>{
        // 서버에 연결
        console.log("MongoDB에 연결")
        // 연결된 데이터베이스 및 컬렉션 참조
        database = client.db("MeddyBabyDB");
        }).catch((err)=>{ //연결 실패
            console.log('DB연결 실패 : ' ,err);
    })
}

function getDatabase(){
    return database;
}

module.exports = { dbConnect, getDatabase };