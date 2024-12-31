const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var NotificationSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    type:{
        type:String,
        enum: ['friend_request','message','like','comment'],
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    readed:{
        type:Boolean,
        default:false,
    },
},{
    timestamps:true,
});

//Export the model
module.exports = mongoose.model('Notification', NotificationSchema);