
const Joi = require('joi')



const registervalidation = function (data){
    const schema = Joi.object({
        name:Joi.string().min(6).required(),
        password:Joi.string().min(6).required()
    })
   const {error} = schema.validate(data)
   if(error)
   {
       return error.details[0].message
   }
}


const updateValidation = function(data)
{
   const schema = Joi.object({
       new_name:Joi.string().max(20).required(),
       current_name:Joi.string().max(20).required(),
       user_password:Joi.string().required()
   })
    return schema.validate(data);
}

module.exports = {registervalidation,updateValidation}
