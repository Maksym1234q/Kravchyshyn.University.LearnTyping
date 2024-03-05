import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

// Завантаження конфігурації змінних середовища з файлу .env
config();

// Функція для генерації токенів доступу та оновлення
export const generateToken = (data, access = true) => {
    // Визначення секретного ключа та терміну дії токену залежно від типу токену
    const secret = access
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REF_TOKEN_SECRET;
    const expiry = access
        ? process.env.ACCESS_TOKEN_EXPIRY
        : process.env.REF_TOKEN_EXPIRY;
    
    // Генерація токену з використанням секретного ключа та терміну дії
    return jwt.sign(data, secret, { expiresIn: parseInt(expiry) });
};

// Функція для перевірки токену доступу та оновлення
export const verifyToken = (token, access = true) => {
    // Визначення секретного ключа залежно від типу токену
    const secret = access
        ? process.env.ACCESS_TOKEN_SECRET
        : process.env.REF_TOKEN_SECRET;
    
    try {
        // Перевірка та розкодування токену з використанням секретного ключа
        return jwt.verify(token, secret);
    } catch (err) {
        // Обробка помилки в разі недійсності токену
        return {
            status: 401,
            message: `Unauthorized: ${err.message}`,
        };
    }
};
