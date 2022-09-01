const Sequelize = require('sequelize');
const { STRING } = Sequelize


const db = new Sequelize(process.env.DATABASE || 'postgres://localhost/avengers_corp_db');

const Hero = db.define('hero', {
    name : {
        type: STRING,
        unique: true, 
        allowNull : false,
    }
})

const Team = db.define('team', {
    name : {
        type: STRING,
        unique: true, 
        allowNull : false,
    }
})

Hero.belongsTo(Team);
Team.hasMany(Hero);

const syncAndSeed = async () =>{
    try{
        await db.sync({ force: true })
        const [IronMan, Loki, Thor, CaptinAmerica, Hulk, Thanos, Ultron, Wanda ] = await Promise.all(
            ['IronMan', 'Loki', 'Thor', 'CaptinAmerica', 'Hulk', 'Thanos', 'Ultron', 'Wanda'].map( hero => Hero.create({ name: hero }))
        )
        const [Evil, Good, Neutral] = await Promise.all(
            ['Evil', 'Good', 'Neutral'].map( team => Team.create({ name: team }))
        )
    }
    catch(err){
        console.log(err);
    }
}



module.exports = {
    syncAndSeed,
    models : {

    }
}