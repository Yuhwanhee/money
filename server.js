const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const app = express();


const User = require('./models/User')
// const Item = require('./models/Item')
// const Buy = require('./models/Buy')
// const Review = require('./models/Review')



const port = process.env.PORT || 9595;
app.listen(port, () => {
   console.log(`server is running on port ${port}`)
})

//몽고DB 연결
mongoose.connect('mongodb+srv://hh90512:!!774912yu@cluster0.4qr9iqs.mongodb.net/money')
   .then(() => {
      const db = mongoose.connection;
      console.log('MongoDB Connected in', db.name)
   })
   .catch((err) => console.log(err))


//미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
