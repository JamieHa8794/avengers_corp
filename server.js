const { syncAndSeed , models: { Hero, Team } } = require('./db/index')

const express = require('express');
const app = express();

const PORT = process.env.port || 3000;

app.listen(PORT, ()=> `listening on port ${PORT}`)

app.get('/', async (req, res, next)=>{
    try{
        const heros = await Hero.findAll({
            include: Team
        });
        const teams = await Team.findAll({
            include: Hero
        });
        res.send({
            heros, teams
        })

    }
    catch(err){
        next(err);
    }
})

const init = async () =>{
    try{
        await syncAndSeed();
    }
    catch(err){
        console.log(err);
    }
}

init();