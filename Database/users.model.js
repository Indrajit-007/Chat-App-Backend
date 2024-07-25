const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    Sessionid: {
        type: String,
        required: true,
        unique: true
    }
},
    {
        timestamps: true
    }
);

const Users = mongoose.model("user", UserSchema);

module.exports = { Users };