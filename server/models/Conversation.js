const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var conservationSchema = new mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'User'
    },
    receiver:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref: 'User'
    },
    messages:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Message'
        },
    ]
},{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('Conservation', conservationSchema);