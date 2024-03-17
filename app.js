// // app.js
// import express from 'express';
// import path from 'path';
// import bodyParser from 'body-parser';
// import { fileURLToPath } from 'url'; // Імпортуйте fileURLToPath для конвертації import.meta.url в шлях файлу
// import { dirname } from 'path'; // Імпортуйте dirname для отримання імені каталогу

// import dbConnection from './dbConnection.js';
// import routes from './routes.js';

// // Отримати ім'я каталогу поточного модуля
// const __dirname = dirname(fileURLToPath(import.meta.url));

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware для розбору запитів JSON
// app.use(express.json());
// app.use((err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || 'Internal Server Error';
//     res.status(err.statusCode).json({
//         message: err.message,
//     });
// });

// // Middleware для розбору URL-кодованих тіл
// app.use(bodyParser.urlencoded({ extended: true }));

// // Служити статичні файли з каталогу 'public'
// const publicDirectoryPath = path.join(__dirname, '');
// app.use(express.static(publicDirectoryPath));

// // Визначення маршрутів
// app.use('/api', routes);

// // Шлях для обробки запитів на головну сторінку
// app.get('/', (req, res) => {
//     // Надіслати головну сторінку
//     res.sendFile(path.join(__dirname, 'index.html'));
// });

// // Шлях для обробки запитів на сторінку профілю
// app.get('/profile', (req, res) => {
//     // Надіслати сторінку профілю
//     res.sendFile(path.join(__dirname, 'profile.html'));
// });

// // Шлях для обробки запитів на сторінку входу
// app.get('/login', (req, res) => {
//     // Надіслати сторінку входу
//     res.sendFile(path.join(__dirname, 'login.html'));
// });

// // Шлях для обробки запитів на сторінку реєстрації
// app.get('/register', (req, res) => {
//     // Надіслати сторінку реєстрації
//     res.sendFile(path.join(__dirname, 'register.html'));
// });

// // Підключення до бази даних і запуск сервера
// dbConnection
//     .getConnection()
//     .then(() => {
//         app.listen(port, () => {
//             console.log(`Сервер запущено на порту ${port}`);
//         });
//     })
//     .catch((err) => {
//         console.log(`Не вдалося підключитися до бази даних: ${err.message}`);
//     });





// // // Маршрут для обробки відправлення реєстрації
// // app.post('/register', (req, res) => {
// //     const { name, email, password } = req.body;

// //     // Перевірка наявності користувача з таким email перед виконанням вставки
// //     dbConnection.query(
// //         'SELECT * FROM users WHERE email = ?',
// //         [email],
// //         (err, userResult) => {
// //             if (err) {
// //                 console.error('Помилка перевірки існуючого користувача:', err);
// //                 res.status(500).send('Не вдалося зареєструвати користувача');
// //                 return;
// //             }

// //             // Якщо користувач з таким email вже існує, відправити повідомлення про помилку
// //             if (userResult.length > 0) {
// //                 res.status(400).send('Користувач з цією адресою електронної пошти вже існує');
// //                 return;
// //             }

// //             // Якщо користувача з таким email не існує, виконати вставку нового користувача
// //             dbConnection.query(
// //                 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
// //                 [name, email, password],
// //                 (err, result) => {
// //                     if (err) {
// //                         console.error('Не вдалося зареєструвати користувача:', err);
// //                         res.status(500).send('Не вдалося зареєструвати користувача');
// //                         return;
// //                     }

// //                     // Відправлення відповіді про успішну реєстрацію користувача
// //                     res.status(200).send('Реєстрація успішна!');
// //                 }
// //             );
// //         }
// //     );
// // });


// // Маршрут для обробки відправлення реєстрації
// app.post('/register', (req, res) => {
//     const { name, email, password } = req.body;

//     // Перевірка чи були надіслані всі необхідні дані
//     if (!name || !email || !password) {
//         return res.status(400).send('Будь ласка, заповніть всі поля');
//     }

//     // Перевірка чи вже існує користувач з вказаною електронною адресою
//     // (Тут можна використовувати базу даних або будь-які інші методи перевірки)
//     // У цьому прикладі ми просто вважаємо, що користувача з такою адресою електронної пошти не існує
//     // Імітуємо успішну реєстрацію та відправляємо відповідне повідомлення
//     res.status(200).send(`Реєстрація користувача ${name} успішна!`);
// });



// // app.post('/login', (req, res) => {
// //     const { email, password } = req.body;

// //     // Виконання запиту SELECT до бази даних
// //     dbConnection.query(
// //       'SELECT * FROM users WHERE email = ? AND password = ?',
// //       [email, password],
// //       (err, results) => {
// //         if (err) {
// //           console.error('Failed to authenticate user:', err);
// //           res.status(500).send('Failed to authenticate user');
// //           return;
// //         }
        
// //         if (results.length === 0) {
// //           res.status(401).send('Invalid email or password');
// //           return;
// //         }

// //         res.send('Login successful!');
// //       }
// //     );
// // });


// // Маршрут для обробки відправлення логіну
// app.post('/login', (req, res) => {
//     const { email, password } = req.body;

//     // Перевірка чи були надіслані всі необхідні дані
//     if (!email || !password) {
//         return res.status(400).send('Будь ласка, заповніть всі поля');
//     }

//     // Перевірка введених даних для логіну
//     // У цьому прикладі ми просто вважаємо, що введені дані для логіну є вірними
//     // Імітуємо успішний вхід та відправляємо відповідне повідомлення
//     res.status(200).send(`Логін користувача з адресою електронної пошти ${email} успішний!`);
// });

import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import dbConnection from './dbConnection.js';
import routes from './routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const publicDirectoryPath = path.join(__dirname, '');
app.use(express.static(publicDirectoryPath));

// Використовуємо маршрути з файлу routes.js
app.use('/', routes);

dbConnection.getConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`Сервер запущено на порту ${port}`);
        });
    })
    .catch((err) => {
        console.log(`Не вдалося підключитися до бази даних: ${err.message}`);
    });

export default app;
