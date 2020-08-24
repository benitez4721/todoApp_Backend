
const {Router} = require("express")
const {check} = require("express-validator")
const {createTask, deleteTask, getTasks, getTaskByUser, editTask }= require("../controllers/tareas")
const {FieldValidator} = require('../middlewares/field-validation')
const { verifyToken } = require("../middlewares/jwt-validation")

const router = Router()

router.get('/', verifyToken,getTaskByUser)

router.post('/', 
        [
        verifyToken,
        check('name', 'The task name is required').not().isEmpty(),
        FieldValidator],
        createTask
    )
router.put('/', 
        [
        verifyToken,
        check('name', 'The task name is required').not().isEmpty(),
        FieldValidator],
        editTask
    )
    
router.delete('/:id', verifyToken,deleteTask)    



module.exports = router
