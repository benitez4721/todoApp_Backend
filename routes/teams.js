
const {Router} = require('express')
const {check} = require('express-validator')
const {FieldValidator} = require('../middlewares/field-validation')
const { createTeam, addMember, getTeam } = require('../controllers/teams')
const { verifyToken } = require('../middlewares/jwt-validation')

const router = Router()

router.get('/',
        verifyToken,
        getTeam   
        )

router.post('/',[
        verifyToken,
        check('name',"The team name is required").not().isEmpty(),
        FieldValidator
        ],
        createTeam   
        )

router.post('/add',[
        verifyToken,
        check('code',"The team code is required").not().isEmpty(),
        FieldValidator],
        addMember)        

module.exports = router
     