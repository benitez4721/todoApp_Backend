
const {Schema,model} = require('mongoose')


const TareaSchema = Schema({
    name: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

})

module.exports = model('Tarea', TareaSchema)