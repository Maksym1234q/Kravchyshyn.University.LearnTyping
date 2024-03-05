import mysql from 'mysql2';
import { config } from 'dotenv';

// Функція для створення підключення до бази даних
const connection = () => {
    // Завантаження конфігурації змінних середовища з файлу .env
    config();
    
    // Отримання змінних середовища для підключення до бази даних
    const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
    
    // Створення пулу підключень до бази даних з використанням отриманих змінних середовища
    console.log('-----Connecting to database...');
    const pool = mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
    });
    
    // Виведення повідомлення про успішне підключення до бази даних
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('-----Error connecting to database:', err);
        } else {
            console.log('-----Connected to database :)');
            connection.release();
        }
    });
    
    // Повернення пулу підключень до бази даних
    return pool;
};

// Експорт об'єкту підключення до бази даних з використанням обіцянок (promises)
export default connection().promise();
