const { syncAndSeed } = require('./db/index')

const express = require('express');
const app = express();


const init = async () =>{
    try{
        await syncAndSeed();
        console.log('connected to db')
    }
    catch(err){
        console.log(err);
    }
}

init();