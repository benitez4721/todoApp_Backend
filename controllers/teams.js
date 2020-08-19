const { response } = require("express");
const Team = require("../models/team");
const TeamUser = require("../models/team-user");


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

const createTeam = async(req, res = response) => {

    try {

        let code = getRndInteger(100,2000)
        while(true){
            const codeExist = await Team.findOne({code})
            if(!codeExist){
                break
            }
            code = getRndInteger(100,2000)
        }
        const body = {code, ...req.body}
        console.log(body);
        const team = new Team(body)
        await team.save()
        res.json({
            ok: true,
            team
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
        const code = req.params.code
        const team = await Team.findOne({code})
        
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
            user: req.uid
        }
        const team_user = new TeamUser(body)

        await team_user.save()

        res.json({
            ok: true,
            team_user
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
    addMember
}