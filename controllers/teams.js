const { response } = require("express");
const Team = require("../models/team");
const TeamUser = require("../models/team-user");
const Usuario = require("../models/usuario");
const { find, findById, populate } = require("../models/team");


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

const getTeam = async(req, res =response) => {
    try {
        let user = req.uid
        let teams = await TeamUser.find({user}).populate({path: 'team', populate: {path: 'owner'}})
        res.json({
            ok: true,
            teams
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            message: "Unexpected error"
        })
    }
}

const createTeam = async(req, res = response) => {

    try {

        let owner = await Usuario.findById(req.uid)
        let code = getRndInteger(100,2000)
        
        while(true){
            const codeExist = await Team.findOne({code})
            if(!codeExist){
                break
            }
            code = getRndInteger(100,2000)
        }
        const body = {code,owner, ...req.body}
        const team = new Team(body)
        await team.save()
        let user_team = new TeamUser({team: team.id, user: req.uid})
        await user_team.save()
        user_team.team = team
        user_team.user = owner
        res.json({
            ok: true,
            user_team
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            message: "Unexpected error"
        })
    }
}

const addMember = async(req, res) => {
    try {
        
        const code = req.body.code
        const team = await Team.findOne({code}).populate('owner')
        const user = await Usuario.findById(req.uid)
        if(!team){
            return res.status(400).json({
                ok: false,
                error: "Invalid Code"
            })
        }

        const existTeamUser = await TeamUser.findOne({team: team.id, user: req.uid})

        if(existTeamUser){
            return res.status(400).json({
                ok: false,
                error: "You are already in this team"
            })
        }
        
        const body = {
            team: team.id,
            user: req.uid,
            type: "member"
        }
        const user_team = new TeamUser(body)
        
        await user_team.save()
        user_team.team = team
        user_team.user = user

        res.json({
            ok: true,
            user_team
        })

        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            message: "Unexpected error"
        })
    }
    
}

module.exports = {
    createTeam,
    addMember,
    getTeam
}