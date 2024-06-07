const express = require('express');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { dbConnect, getDatabase } = require('./DbConnect');
const { ObjectId } = require('mongodb');
const cookieParser = require('cookie-parser');
require('dotenv').config(); //환경 변수
const port = process.env.PORT; //서버 포트 번호
const fs =require('fs');
const {scheduleNotifications, cancelAndDeleteSchedules, initializeScheduledTasks  } = require('./PushAlarm');

describe('POST /addList', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('should add a medicine to the list and schedule notifications', async () => {
    const userCollection = db.collection('user');
    const mediListCollection = db.collection('medicineList');

    // Mock user data
    const userData = {
      _id: 'user_id_1',
      // Other user data...
    };

    // Insert mock user data
    await userCollection.insertOne(userData);

    const medicineData = {
      mediName: 'Medicine A',
      time: '08:00',
      date: '2024-06-10',
      detail: 'Take 1 pill with water',
    };

    // Send request to add medicine
    const response = await request(app)
      .post('/addList')
      .send(medicineData)
      .expect(200);

    // Check if medicine was added to the list
    const medicine = await mediListCollection.findOne({
      mediName: 'Medicine A',
    });
    expect(medicine).toBeTruthy();

    // Check if medicine was added to the user's medicine list
    const user = await userCollection.findOne({ _id: 'user_id_1' });
    expect(user.mediListID).toContain(response.body._id);

    // You might need to add more checks depending on your implementation
  });
});
