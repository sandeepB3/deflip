const express = require("express");
const router = express.Router();
const { db } = require('../db.js');
require("dotenv").config();


router.post('/login', async(req, res) => {
    const data = req.body;
    try{

    }catch(err){
        res.status(500).json(err);
    }
});


router.post('/register', async(req, res) => {
    const data = req.body;
    try{

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;