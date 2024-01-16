const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  phoneNo: Number,
  address: String,
  birthdate: String,
  newItem: [
    {
      title: String,
      author: String,
      category: String, // Fix the typo here
      price: Number,
      publishedYear: String,
      description: String, 
      image: {
        data: Buffer, // Binary data of the image
        contentType: String, // MIME type of the image
      },
    }
  ],
});

const allData = mongoose.model('users', dataSchema);
module.exports = allData;
