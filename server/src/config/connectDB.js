const { Sequelize } = require('sequelize');
import mysql from "mysql2/promise"

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'doanlangnghe'
});


export let connectDB = async () => {
    try {
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}