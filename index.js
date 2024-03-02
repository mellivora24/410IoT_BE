"use strict";

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, onAuthStateChanged} = require('firebase/auth');

const app = express();
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static('public'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://pfoz-iot.onrender.com/');
    res.setHeader('Access-Control-Allow-Methods', ['GET', 'POST']);
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});
app.get('/forgot', async (req, res) => {
    res.sendFile(__dirname + '/views/forgot.html');
});

app.post('/auth',  (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;
    const passkey = process.env.passkey;
    try {
        const userCredential =  signInWithEmailAndPassword(auth, email, password);
        res.status(200).json({ success: true, message: 'Đăng nhập thành công!', passkey: passkey });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Đăng nhập thất bại!', passkey: "hehehe" });
    }
});

app.get('/home', (req, res) => {
    const p = req.query.p;
    const passkey = process.env.passkey;
    if (passkey === p) {
        res.sendFile(__dirname + '/views/home.html');
    } else {
        res.redirect('/');
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on: http://127.0.0.1:${PORT}`);
});
