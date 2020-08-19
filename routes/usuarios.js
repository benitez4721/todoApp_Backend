
const {Router} = require('express')
const{ check } = require('express-validator')

const {crearUsuario, getUsers} = require('../controllers/usuarios')
const {FieldValidator} = require('../middlewares/field-validation')

const router = Router()


router.get('/', getUsers)


router.post('/',

    [check('nombre', "The name is required").not().isEmpty(),
     check('apellido', "The lastname is required").not().isEmpty(),
     check('password', "The password is required").not().isEmpty(),
     check('email', "The email is required").not().isEmpty(),
     FieldValidator
    ]

    ,crearUsuario)




module.exports = router