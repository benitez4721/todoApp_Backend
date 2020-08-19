const {Schema, model} = require("mongoose")


const TeamUserchema = Schema({

    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }
})


module.exports = model('Team-User', TeamUserchema)