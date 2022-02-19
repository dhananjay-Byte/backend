const express = require('express')
const app = express();
const path = require('path')
const loginRoute = require('./routes/login')
const idroute = require('./routes/login')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// connect to database
mongoose.connect(process.env.Connect_DB,{useNewUrlParser:true},
    ()=> console.log('connected to db'))


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'view')))
app.use('/api/postman',loginRoute)






app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'view/form.html'))
})

app.listen(3000,(req,res)=>
{
    console.log("app is listening on port 3000")
})