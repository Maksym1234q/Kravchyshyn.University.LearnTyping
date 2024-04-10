const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer'); // Додаємо модуль Nodemailer
const dotenv = require('dotenv');
const mysql = require('mysql');

dotenv.config({ path: './.env' });

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: 3307
});


// Конфігурація транспортера Nodemailer
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "maksikmaks98@gmail.com", // Ваша електронна адреса
        pass: "iimy ngml rblq cfmb" // Ваш пароль
    }
});

// Функція для надсилання листа
const sendEmail = async (email, subject, text) => {
    try {
        // Визначення опцій листа
        const mailOptions = {
            from: "maksikmaks98@gmail.com", // Ваша електронна адреса, з якої відправляється лист
            to: email, // Електронна адреса користувача
            subject: subject,
            text: text,
        };

        // Надсилання листа
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent :)\nInformation:", info.response);
    } catch (error) {
        console.error(" Error sending email:", error);
    }
};

// Функція для отримання користувача за електронною поштою
const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user WHERE email = ?', [email], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
};

// Функція для вставки нового користувача в базу даних
const insertUser = (name, email, password) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO user SET ?', { name, email, password }, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

// Реєстрація користувача
exports.register = async (req, res) => {
    console.log(req.body);
    const { name, email, password, passwordConfirm } = req.body;
    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.render('register', {
                message: 'That email is already in use'
            });
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        // Генерація хешованого пароля
        const hashedPassword = await bcrypt.hash(password, 8);

        // Вставка користувача з хешованим паролем
        await insertUser(name, email, hashedPassword);

        // Відправка листа користувачу після успішної реєстрації
        const subject = 'Welcome to Learn Typing Club :)';
        const text = `Hello ${name},\n\nThank you for autherisation on learn_typing!`;
        await sendEmail(email, subject, text);

        const userProfile = { name, email };
        res.render('profile', { userProfile });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Інші функції тут...

// Лист для логіну
exports.sendLoginEmail = async (email) => {
    try {
        const subject = 'Welcome Back to Learn Typing Club :)';
        const text = 'Hello,\n\nWelcome back to Learn Typing Club! We are glad to see you again.';
        await sendEmail(email, subject, text);
    } catch (error) {
        console.error(error);
    }
};

exports.login = (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    db.query('SELECT * FROM user WHERE email = ?', [email], async (error, results) => {
        if (error) {
            return res.render('login', {
                message: 'Server error, not connected to DATABASE'
            });
        }
        if (!results || results.length === 0) {
            return res.render('login', {
                message: 'Email or password is incorrect'
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, results[0].password);
        if (!isPasswordCorrect) {
            return res.render('login', {
                message: 'Email or password is incorrect'
            });
        }
        
        // Отримання даних профілю з результатів запиту
        const userProfile = {
            name: results[0].name,
            email: results[0].email
        }; 

        // Відправлення листа з ласкавим словом для логіну
        await exports.sendLoginEmail(email);

        // Генерація токена для аутентифікації користувача
        const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        const cookieOptions = {
            expires: new Date(Date.now() + 3600000), // наприклад, 1 день
            httpOnly: true
        };
        res.cookie('jwt', token, cookieOptions);
        
        // Передача даних профілю у шаблон профілю та рендеринг його
        res.render('profile', { userProfile });
    });   
}
