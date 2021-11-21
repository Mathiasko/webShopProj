const express = require('express');
const jwt = require('jsonwebtoken');
const crypt = require('../config/encrypt');
const { matchUserEmailAndPassword } = require('../services/login');
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    // const { error } = User.validateLoginInfo(req.body);
    // if (error) throw { statusCode: 400, message: error };
    // const loggedInUser = await matchUserEmailAndPassword(req.body);
    // const token = await jwt.sign(JSON.stringify(loggedInUser), crypt.jwtPrivateKey);
    // loggedInUser.token = token;
    // console.log(loggedInUser)
    // res.send(JSON.stringify(loggedInUser));

    const loggedInUser = await matchUserEmailAndPassword(req.body.email);
    // res.json(await matchUserEmailAndPassword(req.body));
    console.log('loggedInUser ', loggedInUser);
    res.json(loggedInUser);
  } catch (err) {
    console.error(`Error while logging in`, err.message);
    next(err);
  }
});

module.exports = router;
