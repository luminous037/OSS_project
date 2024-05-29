// server/firebaseAdmin.js
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

module.exports = admin;