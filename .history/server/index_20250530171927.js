import express from 'express';
import * as dotenv from 'dotenv';
import sequelize from "./config/database.js";
import cors from"cors";
import router from './routes/index.js';



dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({message:'Yeah! Its work!'})
})

const start= async()=>{
    try{
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
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