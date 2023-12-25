"use strict";

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

var PORT = process.env.PORT || 5000;
var DB = require('./models/model');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.set('strictQuery', true);

var connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://host:76YHG5lrAwQbNvTL@admin0.nbgexxx.mongodb.net/?retryWrites=true&w=majority');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

connectDB();

app. get('/', function (req, res) {
    res.send("<b>Hello human! Server is running.<b>");
});

app.post('/login', async (req, res) => {
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
                res.json({ success: true, message: 'Login successful'});
            } else {
                res.json({ success: false, message: 'Incorrect password'});
            }
        }
    } catch (error) { res.json(error); }
});

app.listen(PORT, () => {
    console.log(`Server is running http://127.0.0.1:${PORT}`);
});