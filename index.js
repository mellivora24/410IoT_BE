// code created by Quyet Thanh

"use strict";

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getDatabase, ref, child, get, update } = require('firebase/database');

//---------------------------------------------------------------
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};
const firebase_app = initializeApp(firebaseConfig);
const auth = getAuth(firebase_app);
const app = express();

//----------------------------------------------------------------
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


//-----------------------------------------------------------------
app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});
app.get('/forgot', async (req, res) => {
    res.sendFile(__dirname + '/views/forgot.html');
});
app.post('/auth', async (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;
    const passkey = process.env.passkey;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            res.status(200).json({ success: true, message: 'Đăng nhập thành công!', passkey: passkey });
        })
        .catch((error) => {
            res.status(500).json({ success: false, message: 'Đăng nhập thất bại!', passkey: "hehehe" });
        });
});
app.get('/home', async (req, res) => {
    const p = req.query.p;
    const passkey = process.env.passkey;
    if (passkey === p) {
        res.sendFile(__dirname + '/views/home.html');
    } else {
        res.redirect('/');
    }
});


//-----------------------------------------------------------------
const dbRef = ref(getDatabase(firebase_app));

function getState(key) {
    return new Promise((resolve, reject) => {
        get(child(dbRef, key))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    resolve(snapshot.val());
                } else {
                    resolve(false);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

app.get('/state', async (req, res) => {
    try {
        const [
            fan_1_state,
            fan_2_state,
            led_1_state,
            led_2_state,
            led_3_state,
            led_bath_state,
            led_wc_state
        ] = await Promise.all([
            getState('fan_1'),
            getState('fan_2'),
            getState('led_1'),
            getState('led_2'),
            getState('led_3'),
            getState('led_bath'),
            getState('led_wc')
        ]);

        const data = [
            { name: 'fan_1', state: fan_1_state },
            { name: 'fan_2', state: fan_2_state },
            { name: 'led_1', state: led_1_state },
            { name: 'led_2', state: led_2_state },
            { name: 'led_3', state: led_3_state },
            { name: 'led_bath', state: led_bath_state },
            { name: 'led_wc', state: led_wc_state }
        ];

        const update = process.env.updateKey;

        res.status(200).send({ stateArr: data, updateKey: update });
    } catch (error) {
        res.status(500).send({ error: 'Server lỗi CMNR!' });
    }
});

app.post('/change', async (req, res) => {
    try {
        const name = req.body.name;
        const state = req.body.state;
        const key = req.body.key;
        const updateKey = process.env.updateKey;

        if (key === updateKey) {
            const updates = {};
            updates[name] = state;
            update(dbRef, updates);
            res.status(200).send({ success: true });
        } else {
            res.status(401).send({ error: 'Định hack à :))' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Server lỗi CMNR' });
    }
});



//-----------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`OK chạy rồi! http://127.0.0.1:${PORT}`);
});
