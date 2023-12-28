"use strict";

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

var PORT = process.env.PORT || 5000;
var DB = require('./build/model');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
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

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});
app.get('/forgot', async (req, res) => {
    res.sendFile(__dirname + '/views/forgot.html');
});
app.get('/home', async (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

app.post('/auth', async (req, res) => {
    const { infor, auth } = req.body;
    try {
        var data = await DB.find({ msv: infor });
        console.log(data[0].pass === auth)
        if (data[0].pass === auth) {
            res.status(200).json({ success: true, message: 'Đăng nhập thành công!' });
        } else {
            res.status(500).json({ success: false, message: 'Sai mật khẩu rồi!' });
        }
    } catch (error) {
        res.json({ success: false, message: error });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running: http://127.0.0.1:${PORT}`);
});