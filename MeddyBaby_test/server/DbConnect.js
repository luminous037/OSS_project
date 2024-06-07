const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://Gaudul:ab213466@meddybaby.plkzmsm.mongodb.net/"
let database = null;


async function dbConnect() {
    try {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();
      //console.log("MongoDB에 연결");
      database = client.db("MeddyBabyDB");
    } catch (err) {
      database = null;
      //console.error('DB 연결 실패:', err);
    }
  }

function getDatabase(){
    return database;
}

module.exports = { dbConnect, getDatabase };