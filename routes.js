// routes.js
import { Router } from 'express';
import { body, header } from 'express-validator';
import controller, { validate, fetchUserByEmailOrID } from './controller.js';

const routes = Router({ strict: true });

// Правило валідації токена
const tokenValidation = (isRefresh = false) => {
    let refreshText = isRefresh ? 'Refresh' : 'Authorization';

    return [
        header('Authorization', `Please provide your ${refreshText} token`)
            .exists()
            .not()
            .isEmpty()
            .custom((value, { req }) => {
                if (!value.startsWith('Bearer') || !value.split(' ')[1]) {
                    throw new Error(`Invalid ${refreshText} token`);
                }
                if (isRefresh) {
                    req.headers.refresh_token = value.split(' ')[1];
                    return true;
                }
                req.headers.access_token = value.split(' ')[1];
                return true;
            }),
    ];
};


// Реєстрація нового користувача
routes.post(
    '/signup',
    [
        body('name')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Ім\'я не повинно бути порожнім.')
            .isLength({ min: 3 })
            .withMessage('Ім\'я повинно бути довжиною щонайменше 3 символи')
            .escape(),
        body('email', 'Недійсна адреса електронної пошти.')
            .trim()
            .isEmail()
            .custom(async (email) => {
                const isExist = await fetchUserByEmailOrID(email);
                if (isExist.length)
                    throw new Error(
                        'Користувач з цією адресою електронної пошти вже існує'
                    );
                return true;
            }),
        body('password')
            .trim()
            .isLength({ min: 4 })
            .withMessage('Пароль повинен бути довжиною щонайменше 4 символи'),
    ],
    validate,
    controller.signup
);

// Вхід користувача за допомогою адреси електронної пошти та пароля
routes.post(
    '/login',
    [
        body('email', 'Недійсна адреса електронної пошти.')
            .trim()
            .isEmail()
            .custom(async (email, { req }) => {
                const isExist = await fetchUserByEmailOrID(email);
                if (isExist.length === 0)
                    throw new Error('Ваша адреса електронної пошти не зареєстрована.');
                req.body.user = isExist[0];
                return true;
            }),
        body('password', 'Неправильний пароль').trim().isLength({ min: 4 }),
    ],
    validate,
    controller.login
);


// Отримати дані користувача, надавши доступний токен
routes.get('/profile', tokenValidation(), validate, controller.getUser);

// Отримати новий доступ та токен оновлення, надавши токен оновлення
routes.get(
    '/refresh',
    tokenValidation(true),
    validate,
    controller.refreshToken
);

export default routes;
