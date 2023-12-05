const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')

const app = express();


const User = require('./models/User')
const Post = require('./models/Post')
const PostComment = require('./models/PostComment')
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



//엔드포인트 설정

app.post('/signup', async (req, res) => {
   const { id, password, name } = req.body

   try {
      const already = await User.findOne({ name: name })
      if (already) {
         res.status(400).json()
      } else {
         const user = new User({
            id,
            password,
            name
         })
         await user.save()
         const token = jwt.sign({
            id: user._id
         },
            'secrest',
            {
               expiresIn: '2m'
            }
         )
         res.status(200).json({ token: token })
         console.log('새로운 유저 회원가입 됨')

      }
   } catch (err) {
      console.log(err)
      res.status(500).json
   }
})


app.post('/login', async (req, res) => {
   const { isId, isPw } = req.body

   try {
      const user = await User.findOne({ id: isId })
      if (!user) {
         res.status(400).json()
      } else {
         if (isPw === user.password) {
            const token = jwt.sign({
               id: user._id
            },
               'secrest',
               {
                  expiresIn: '2m'
               }
            )
            res.status(200).json({ token: token })
         } else {
            res.status(400).json()
         }
      }
   } catch (err) {
      console.log(err)
      res.status(500).json
   }
})

app.post('/rulet', async (req, res) => {
   const { userId, prize } = req.body
   try {
      const user = await User.findById(userId)
      if (!user) {
         res.status(400).json()
      } else {
         let count = -2000;
         if (prize === 0) {
            count += 1000
         } else if (prize === 1) {
            count += 2000
         } else if (prize === 2) {
            count += 0
         } else if (prize === 3) {
            count += 10000
         } else if (prize === 4) {
            count += 300000
         }
         else if (prize === 5) {
            count += 15000
         }
         user.point += count
         await user.save()

         res.status(200).json()
      }
   } catch (err) {
      console.log(err)
      res.status(500).json
   }
})

app.post('/point', async (req, res) => {
   const { userId } = req.body
   try {
      const user = await User.findById(userId)
      if (!user) {
         res.status(400).json()
      } else {
         res.status(200).json({ point: user.point })
      }
   } catch (err) {
      console.log(err)
   }
})


app.get('/fetch-post', async (req,res) => {
   try {
      const post = await Post.find()
      if (!post) {
         res.status(400).json()
      } else {
         res.send(post)
      }
   }catch (err) {
      console.log(err)
   }
})