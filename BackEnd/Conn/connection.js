const express = require('mongoose');
const mongoose = require('mongoose');

// Replace 'your_username' and 'your_password' with your actual MongoDB credentials
// Replace '3.236.216.233' with the actual IP address or hostname of your MongoDB server
// Replace '27017' with the actual port number if it's different
// Replace 'bookapp' with the actual name of your MongoDB database
const connectionString = 'mongodb://your_username:your_password@34.231.110.65:27017/bookapp';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
