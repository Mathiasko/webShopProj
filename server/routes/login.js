const express = require('express');
const jwt = require('jsonwebtoken');
const {crypt} = require('../helper');
const { matchUserEmailAndPassword } = require('../services/login');
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const loggedInUser = await matchUserEmailAndPassword(req.body);
    const token = await jwt.sign(JSON.stringify(loggedInUser), crypt.jwtPrivateKey);
    loggedInUser.token = token;

    res.send(JSON.stringify(loggedInUser));
    res.json(loggedInUser);
  } catch (err) {
    console.error(`Error while logging in`, err.message);
    next(err);
  }
});

module.exports = router;
