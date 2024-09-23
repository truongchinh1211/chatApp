
const mongoose = require('mongoose'); 

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        default:""
    },
    dob:{
        type:Date,
        default:null
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);