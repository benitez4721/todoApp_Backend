
const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    
    nombre: {
        type: String,
        required: true
    },

    apellido: {
        type: String,
        required: true
    },

    password: {
        type: String,     
        required: true
    },

    email: {
        type: String,
        unique: true
    },

    img: {
        type: String
    },

    google: {
        type: Boolean,
        default: false
    }



});

module.exports = model('Usuario', UsuarioSchema)