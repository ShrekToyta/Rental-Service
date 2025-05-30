import express from 'express';
import * as dotenv from 'dotenv';
import sequelize from "./config/database.js";

import { Users } from './models/user.js';
import { Offer } from './models/offer.js';
import { Review } from './models/review.js';


dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();



const start= async()=>{
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT,()=>console.log(`Сервер запущен на порте ${PORT}`));
    }catch(e){
        console.log(e);
    }
};

start();
console.log('DB config:', {
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});