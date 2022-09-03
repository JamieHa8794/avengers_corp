const { syncAndSeed , models: { Hero, Team } } = require('./db/index')

const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.port || 3000;

app.listen(PORT, ()=> `listening on port ${PORT}`)
app.use('/public', express.static(path.join(__dirname, 'public')))


app.get('/', async (req, res, next)=>{
    try{
        const heros = await Hero.findAll({
            include: Team
        });
        const teams = await Team.findAll({
            include: Hero
        });
        // res.send({
        //     heros, teams
        // })
        res.send(`
        <html>
        <head>
            <link rel="stylesheet" href="/public/styles.css"/>
            <title>Avenger's Teams</title>
        </head>
        <body>
                ${teams.map(team =>{
                    return(`
                        <div class='team-block'>
                        <h1>
                            ${team.name}
                        </h1>
                        <ul>
                        ${team.heros.map(hero =>{
                            return(`
                            <li>
                            ${hero.name}
                            <form>
                            <select>
                                ${teams.map(team =>{
                                    return(`
                                        
                                            <option>
                                                ${team.name}   
                                            </option>
                                            
                                            `)
                                })}
                                </select>
                                <button>
                                    Change Teams
                                </button>
                            </form>
                            </li>
                            `)
                        }).join('')}
                        </ul>
                        </div>
                    `)
                }).join('')}
        </body>
        </html>
        `)
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