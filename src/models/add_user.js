const mongoose = require('mongoose');

var addUserSchemas = new mongoose.Schema({
    name:{
        type : String,
        required:true
    },
    email:{
        type : String,
        required:true,
        unique:true
    },
    gender:{
        type:String
    },
    status:{
        type:String
    }
})

const userDB = mongoose.model("User",addUserSchemas);
module.exports =  userDB;