const {response} = require("express")
const bcrypt = require('bcryptjs')
const Usuario = require("../models/usuario")
const {generateToken} = require('../helpers/jwt')


const login = async (req, res = response) => {
    const {email, password} = req.body
    const user = await Usuario.findOne({email}) 
    if(!user){
        return res.status(400).json({
            ok: false,
            error: "(Email) or password is incorrect"
        })
    }

    const validatePassword = bcrypt.compareSync(password, user.password)
    if(!validatePassword){
        return res.status(400).json({
            ok: false,
            error: "Email or (password) is incorrect"
        })
    }

    const token = await generateToken(user.id).catch( (err) => console.log(err))
    res.json({
        ok: true,
        token

    })
}

module.exports = {
    login
}