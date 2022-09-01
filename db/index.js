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


const syncAndSeed = async () =>{
    try{
        await db.sync({ force: true })
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