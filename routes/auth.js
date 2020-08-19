
const {Router} = require("express")
const { login } = require("../controllers/auth")
const { check } = require("express-validator")
const { FieldValidator } = require("../middlewares/field-validation")


const router = Router()

router.post('/',

    [check('email','The email is required').not().isEmpty(),
     check('password','The password is required').not().isEmpty(),
     FieldValidator
    ],
    login)

module.exports = router