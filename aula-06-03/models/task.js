const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    title: { type: String, required: true},
    finished : Boolean
})

module.exports = mongoose.model("Task", schema);