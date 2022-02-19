const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    name:{
       type:String,
       required:true
    },
    password:{
        type:String,
        required:true
     },
     Date:
   {
      type:Date,
      default:new Date()
   }
})

module.exports = mongoose.model('User',userschema)