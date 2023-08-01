const mongoose = require("mongoose");

//Creating Schema
const userSchema = new mongoose.Schema({
    task : {
        type: String,
        
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    deadline : {
        type: Date,
        required : true,
    },
    status : {
        type: String,
        required : true,
    },
},
);


//Creating Model
const userModel = mongoose.model('userModel', userSchema)

module.exports = userModel;



