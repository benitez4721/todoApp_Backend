const {response} = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const {generateToken} = require('../helpers/jwt')


const getUsers = async(req, res = response) => {

    try {
        const usuarios = await Usuario.find({}, 'nombre apellido email')
        res.json({
            ok: true,
            usuarios
        })
    } catch (error) {
        
    }
}

const crearUsuario = async(req, res= response) => {
    const {apellido, email, password} = req.body;

    try {
        const usuario = new Usuario(req.body)

        const existeEmail = await Usuario.findOne({email})

        if(existeEmail){
            return res.status(400).json({
                ok: false,
                message: "Email already exist"
            })
        }

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt)
        
        await usuario.save()

        res.json({
            ok: true,
            usuario
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            message: 'Error inesperado'
        })
    }
}

module.exports = {
    crearUsuario,
    getUsers
}