//routes / pages.js
const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');
const { validationResult } = require('express-validator');

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
router.get('/lesson-2', (req, res) => {
    res.render('lesson-2'); 
});
router.get('/lesson-3', (req, res) => {
    res.render('lesson-3'); 
});
router.get('/lesson-4', (req, res) => {
    res.render('lesson-4'); 
});
router.get('/lesson-5', (req, res) => {
    res.render('lesson-5'); 
});
router.get('/lesson-6', (req, res) => {
    res.render('lesson-6'); 
});
router.get('/lesson-7', (req, res) => {
    res.render('lesson-7'); 
});
router.get('/lesson-8', (req, res) => {
    res.render('lesson-8'); 
});
router.get('/lesson-9', (req, res) => {
    res.render('lesson-9'); 
});
router.get('/lesson-10', (req, res) => {
    res.render('lesson-10'); 
});
router.get('/lesson-11', (req, res) => {
    res.render('lesson-11'); 
});
router.get('/lesson-12', (req, res) => {
    res.render('lesson-12'); 
});
router.get('/lesson-13', (req, res) => {
    res.render('lesson-13'); 
});
router.get('/lesson-14', (req, res) => {
    res.render('lesson-14'); 
});
router.get('/lesson-15', (req, res) => {
    res.render('lesson-15'); 
});
router.get('/lesson-16', (req, res) => {
    res.render('lesson-16'); 
});
router.get('/lesson-17', (req, res) => {
    res.render('lesson-17'); 
});
router.get('/lesson-18', (req, res) => {
    res.render('lesson-18'); 
});
router.get('/lesson-19', (req, res) => {
    res.render('lesson-19'); 
});
router.get('/lesson-20', (req, res) => {
    res.render('lesson-20'); 
});
router.get('/lesson-21', (req, res) => {
    res.render('lesson-21'); 
});
router.get('/lesson-22', (req, res) => {
    res.render('lesson-22'); 
});
router.get('/lesson-23', (req, res) => {
    res.render('lesson-23'); 
});
router.get('/lesson-24', (req, res) => {
    res.render('lesson-24'); 
});
router.get('/lesson-25', (req, res) => {
    res.render('lesson-25'); 
});
router.get('/contact', (req, res) => {
    res.render('contact'); 
});

module.exports = router;


