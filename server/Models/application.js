// import { isEmail } from 'validator';
const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
    Name: {
        type: String,
        // required: true
    },
    Email: {
        type: String,
        // required: true
        // validate: [isEmail, 'invalid email']
    },
    Branch: {
        type: String,
        // required: true
    },
    Role: {
        type: String,
        // required: true
    },
    Resume: {
        type: String
        // required: true
    }
})

const application = mongoose.model("application", ApplicationSchema)
module.exports = application