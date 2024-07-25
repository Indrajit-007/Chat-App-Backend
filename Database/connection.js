const mongoose = require("mongoose");

function connectDB(url) {
    mongoose.connect(url)
        .then(console.log("Database Connected succesfully ."))
        .catch((err) => console.log(err))
}

module.exports = { connectDB };