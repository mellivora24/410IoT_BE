"use strict";

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

var PORT = process.env.PORT || 5000;
var DB = require('./models/model');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/src', express.static('src'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://pfoz-iot.onrender.com');
    res.setHeader('Access-Control-Allow-Origin', 'https://pfoz-iot.onrender.com/auth');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.set('strictQuery', true);

var connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://host:76YHG5lrAwQbNvTL@admin0.nbgexxx.mongodb.net/?retryWrites=true&w=majority');
        console.log("Ready to use!");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

connectDB();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});
app.get('/forgot', (req, res) => {
    res.sendFile(__dirname + '/forgot.html');
});
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.post('/auth', async (req, res) => {
    const { infor, auth } = req.body;
    try {
        var data = await DB.find({ msv: infor });
        if (data[0].pass === auth) {
            res.json({ success: true, message: 'Đăng nhập thành công!' });
        } else {
            res.status(500).json({ success: false, message: 'Sai mật khẩu rồi!' });
        }
    } catch (error) {
        res.json({ success: false, message: error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running!`);
    console.log(PORT);
});
