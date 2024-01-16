const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    catagory:String,
    price:Number,
    publishedYear: String,
    description: String,

    image: {
        data: Buffer, // Binary data of the image
        contentType: String, // MIME type of the image
      },
  });

  const books =  mongoose.model('books',bookSchema)
  module.exports = books