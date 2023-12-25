"use strict";

var mongoose = require("mongoose");

var Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
   phone: {
    type: String,
    required: true
  },
  pass: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("DB", Schema);
