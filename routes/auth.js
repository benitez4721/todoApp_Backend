
const {Router} = require("express")
const { login, renewToken } = require("../controllers/auth")
const { check } = require("express-validator")
const { FieldValidator } = require("../middlewares/field-validation")
const { verifyToken } = require("../middlewares/jwt-validation")


const router = Router()

router.post('/',

    [check('email','The email is required').not().isEmpty(),
     check('password','The password is required').not().isEmpty(),
     FieldValidator
    ],
    login)

router.get('/renew',verifyToken,renewToken),    

module.exports = router