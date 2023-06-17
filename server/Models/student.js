const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const student = mongoose.model("student", StudentSchema)
module.exports = student