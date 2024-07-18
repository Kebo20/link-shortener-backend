// import { Sequelize } from "sequelize";
import { Sequelize } from 'sequelize-typescript';


export const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
        max: 20,
        min: 0,
        acquire: 100000,
        idle: 100000,
    },
});