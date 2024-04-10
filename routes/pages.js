//routes / pages.js
const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');

router.get('/', (req, res) => {
    res.render('index');
})
router.get('/register', (req, res) => {
    res.render('register');
})
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/profile', (req, res) => {
    res.render('profile'); 
});

router.get('/game-1', (req,res) => {
    res.render('game-1');
})
router.get('/game-2', (req,res) => {
    res.render('game-2');
})
router.get('/game-3', (req,res) => {
    res.render('game-3');
})
router.get('/lesson', (req, res) => {
    res.render('lesson'); 
});
router.get('/lesson-1', (req, res) => {
    res.render('lesson-1'); 
});






module.exports = router;


