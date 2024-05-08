//app.js   npm start

const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');


dotenv.config({ path: './.env'});

const app = express();


 const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: 3307

 })

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Аналіз закодованих URL-адрес (як надіслано HTML-формами)
app.use(express.urlencoded({extended: false }));
// Parse JSON bodies (as sent by Api client) 
app.use(express.json());

app.set('view engine', 'hbs');

       
db.connect( (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected... :)")
    }
})


//Define Routes
app.use('/', require('./routes/pages'));  
app.use('/auth', require('./routes/auth')); 

app.listen(5001, () => {
    console.log("-------------------------------------Server started on Port 5001 -------------------------------------");
})





app.post('/send-email', (req, res) => {
    const { name, email, message, rating } = req.body;

    // Налаштування транспортера Nodemailer для відправлення пошти
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "maksikmaks98@gmail.com", // Ваша електронна адреса
            pass: "iimy ngml rblq cfmb" // Ваш пароль
        }
    });

    // Відправка поштового повідомлення
    transporter.sendMail({
        from: email,
        to: 'maksikmaks98@gmail.com', // Ваша пошта
        subject: 'Повідомлення з форми зворотнього зв\'язку',
        html: `<p>Ім'я: ${name}</p>
               <p>Email: ${email}</p>
               <p>Повідомлення: ${message}</p>
               <p>Оцінка платформи: ${rating} зірок</p>`
    }, (error, info) => {
        if (error) {
            console.error('Помилка відправки пошти:', error);
            res.status(500).send('Помилка відправки пошти');
        } else {
            console.log('Повідомлення успішно надіслане:', info.response);
            res.status(200).send('Повідомлення успішно надіслане');
        }
    });
});











