
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

UsuarioSchema.method('toJSON', function(){
    const {__v,_id, password, ...object} = this.toObject()

    object.uid = _id;
    return object
})

module.exports = model('Usuario', UsuarioSchema)