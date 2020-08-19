require('dotenv').config()
const jwt = require('jsonwebtoken');


const generateToken = (uid) => {
    return new Promise((resolve, reject) => {

        const payload = {
            uid
        };
    
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('Error token generate')
            }else{
                resolve(token)
            }
        })

    })


}

module.exports = {
    generateToken
}