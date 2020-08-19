
const {Router} = require('express')
const {check} = require('express-validator')
const {FieldValidator} = require('../middlewares/field-validation')
const { createTeam, addMember } = require('../controllers/teams')
const { verifyToken } = require('../middlewares/jwt-validation')

const router = Router()

router.post('/',
            [check('name',"The team name is required").not().isEmpty(),
            FieldValidator],
            createTeam   
        )

router.post('/:code',[
        verifyToken,
        check('code',"The team code is required").not().isEmpty(),
        FieldValidator],
        addMember)        

module.exports = router
     