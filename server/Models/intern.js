const mongoose = require("mongoose");

const InternSchema = new mongoose.Schema({
    CompanyName: {
        type: String,
        required: true
    },
    JobRole: {
        type: String,
        required: true
    },
    Stipend: {
        type: Number,
        default: 0
    },
    CutOff: {
        type: Number,
        default: 0.0      
    }
})

const intern = mongoose.model("intern", InternSchema)
module.exports = intern