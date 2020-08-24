const {response} = require("express")
const bcrypt = require('bcryptjs')
const Usuario = require("../models/usuario")
const {generateToken} = require('../helpers/jwt')


const login = async (req, res = response) => {

    try {
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
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            error: "Unexpected Error"
        })
        
    }
}


const renewToken = async( req, res) => {
    try {
        const uid = req.uid
        const [user, token] =  await Promise.all([
            Usuario.findById(uid),
            generateToken(uid)
        ])
        
        res.json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            error: "Unexpected Error"
        })
    }


}

module.exports = {
    login,
    renewToken
}