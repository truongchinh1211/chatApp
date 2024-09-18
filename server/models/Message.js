const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var messageSchema = new mongoose.Schema({
    text:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        default:""
    },
    videoUrl:{
        type:String,
        default:""
    },
    seen:{
        type:Boolean,
        default: false
    },
},{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Message', messageSchema);