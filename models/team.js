const {Schema, model} = require("mongoose")


const TeamSchema = Schema({

    name: {
        type: String,
        required: true
    },

    code: {
        type: Number,
        required: true,
    }
})


module.exports = model('Team', TeamSchema)
