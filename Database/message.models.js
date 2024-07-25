const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    message: {
        type: String
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    }

});

const Message = mongoose.model("message", MessageSchema);

module.exports = { Message };