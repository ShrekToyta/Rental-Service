import express from 'express';
import * as dotenv from 'dotenv';
import sequelize from "./config/database.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, () => console.log('Сервер запущен на порте ${PORT}'));