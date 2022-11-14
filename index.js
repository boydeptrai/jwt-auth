require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('./middleware/auth');
const app = express();

app.use(express.json());

const users = [
    {
        id: 1,
        username: "TuanTran"
    },
    {
        id: 2,
        username:"HueNg"
    }
]
app.get('/posts',verifyToken,(req,res) =>{
    res.json({posts:'my posts'})
})

app.post('/login',(req,res) =>{
    const username = req.body.username;
    const user = users.find((user) =>user.username === username)
    if(!user) return res.sendStatus(401)

    //Create JWT
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken})
})

const PORT = process.env.PORT || 4000 

app.listen(PORT,() =>{
    console.log(`Server started on port ${PORT}`)
})

