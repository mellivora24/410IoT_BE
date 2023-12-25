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
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET','POST');
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

app. get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});
app. get('/forgot', (req, res) => {
    res.sendFile(__dirname + '/forgot.html');
});

app.post('/auth', async (req, res) => {
    try {
        const { infor, auth } = req.body;
        var data = await DB.find({ phone: infor });
        if (data.length > 0) {
            if (data[0].pass === auth) {
                res.json({ success: true, message: 'Login successful'});
            } else {
                res.json({ success: false, message: 'Incorrect password'});
            }
        } else {
            data = await DB.find({ email: infor });
            if (data[0].pass === auth) {
                res.status(200).sendFile(__dirname + '/home.html');
            } else {
                res.status(500).json({ success: false, message: 'Incorrect password'});
            }
        }
    } catch (error) { res.json(error); }
});

app.listen(PORT, () => {
    console.log(`Server is running!`);
});
