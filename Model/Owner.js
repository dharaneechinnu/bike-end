const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
   
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    doctorid: {
        type: String,
        required: true
    },
    role: {
        type: String,
      
    },
 
    otpToken:{
         type:String,
    },
    Otpexprie:{
        type:String,
    },
    resetPwdToken: {
        type: String,
        default: null
    },
    resetPwdExpire: {
        type: Date,
        default: null
    },

});

const userModel = mongoose.model("Doctor-Reg", DoctorSchema); 
module.exports = userModel;