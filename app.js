//app.js   npm start

const express = require("express")
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');

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