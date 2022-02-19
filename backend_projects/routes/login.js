const express = require('express')
const app = express()
const route = express.Router()
const User = require('../model/User')
const bcrypt = require('bcrypt')
const  {registervalidation,updateValidation} = require('../validation')



// signing up the use into the DB
route.post('/signUp', async (req,res)=>
{
    // validation of schema
    const result = registervalidation(req.body)
    if(result){return res.status(400).send(result)}

    // checking whether the username is unqiue or not
    const username = await User.findOne({name:req.body.name})
    if(username){return res.status(400).send('user name already exit!')}

    // Hashing the password using brcypt package
     const salt = await bcrypt.genSalt(10);
     const hashpassword = await bcrypt.hash(req.body.password,salt)

    // saving user to the DB
    const user = new User({
        name : req.body.name,
        password : hashpassword
    })
    try{
         const savedUser = await user.save();
         res.status(200).redirect('back')
    }
    catch(err)
    {
        res.status(400).send(err)
    }
})

// checking and updating the DB 
route.post('/update', async (req,res)=>
{
    // schema validation for update form
    const {error} = updateValidation(req.body)
    if(error){return res.status(400).send(error.details[0].message)}

     // checking whether the username is unqiue or not
     const username = await User.findOne({name:req.body.new_name})
     if(username){return res.status(400).send('user name already exit!')}

    //checking the whether use exist in the database or not
   const {current_name , new_name , user_password} = req.body
    const validUser = await User.findOne({name : current_name})
    if(!validUser){ return res.status(404).send('name does not exist')}

    // checking the use password correct or not
       const password_check = await bcrypt.compare(req.body.user_password,validUser.password)
       if(!password_check){ return res.status(404).send('wrong password try again')}

      //updating the user in DB
       await User.updateOne({name : current_name},{name :new_name})
      res.status(200).send(`name ${current_name} updated to ${new_name}`)
})
route.get('/data',(req,res)=>
{
   console.log('data')  
})

module.exports = route