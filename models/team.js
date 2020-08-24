const {Schema, model} = require("mongoose")


const TeamSchema = Schema({

    name: {
        type: String,
        required: true
    },

    code: {
        type: Number,
        required: true,
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
})


module.exports = model('Team', TeamSchema)
