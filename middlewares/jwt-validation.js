const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(400).json({
            ok: false,
            error: "Token is required"
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            error: 'Invalid token'
        })
    }
}

module.exports = {
    verifyToken
}