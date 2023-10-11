const { Sequelize } = require('sequelize');
import mysql from "mysql2/promise";

require("dotenv").config()

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE_NAME,
});


export let connectDB = async () => {
    try {
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}