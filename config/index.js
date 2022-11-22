const admin = require('firebase-admin')
const firebase = require('firebase/app')
const serviceAccount = require('../serviceAccount.json')

var config = {
  port:3000
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const firebaseConfig = {
  apiKey: "AIzaSyBsfRuvn0k03efWn8ur7qOHmHJLBpzQm34",
  authDomain: "tutorial-50094.firebaseapp.com",
  projectId: "tutorial-50094",
  storageBucket: "tutorial-50094.appspot.com",
  messagingSenderId: "732172650836",
  appId: "1:732172650836:web:1bb936d9a495fb4d7620c1",
  measurementId: "G-6ZMVRTNNWQ"
};

firebase.initializeApp(firebaseConfig);

module.exports = {config: config, admin: admin}
