const { response } = require("express");
const Tarea = require("../models/tarea");
const Usuario = require("../models/usuario");




// const getTasks = async(req, res = response) => {
    
//     try {
//         const tasks = await Tarea.find({})
//         res.json({
//             ok: true,
//             tasks
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({
//             ok: true,
//             message: "Unexpected error"
//         })  
//     }
// }

const getTaskByUser = async(req, res = response) => {
    const user = req.uid
    try {
        const tasks = await Tarea.find({user})
        res.json({
            ok: true,
            tasks
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            message: "Unexpected error"
        })  
    }
}


const createTask = async(req, res = response) => {
    
    try {
        const uid = req.uid
        const body = {
            user: uid,
            ...req.body
        }
        if(!await Usuario.findById(uid)){
            return res.status(400).json({
                ok: false,
                message: "User doesn`t exist"
            })
        }
        const tarea = new Tarea(body)
        await tarea.save()
        res.json({
            ok: true,
            tarea
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            message: "Unexpected error"
        })       
    }
}

const editTask = async(req, res = response) => {
    const {_id, user, ...fields} = req.body
    try {
        const taskExist = await Tarea.findById(_id)
        if(taskExist){
            let task = await Tarea.findByIdAndUpdate(_id,fields,{new: true})
            return res.json({
                ok: true,
                message: "Task updated",
                task
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: true,
            message: "Unexpected error"
        })  
    }
}

const deleteTask = async(req, res = response) => {
    
    const tid = req.params.id
    try {
        const taskExist = await Tarea.findById(tid)
        if(taskExist){
            await Tarea.findByIdAndDelete(tid)
            return res.json({
                ok: true,
                message: "Task deleted"
            })
        }

        return res.status(400).json({
            ok: false,
            error: "Task doesn`t exist"        
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            message: "Unexpected Error"
        })
    }
}



module.exports = {
    createTask,
    deleteTask,
    getTaskByUser,
    editTask
}