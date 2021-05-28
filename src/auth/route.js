'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('../models/users.js');
const basicAuth = require('./middleware/basic.js');
const bearerAuth = require('./middleware/bearer.js');
const acl = require('./middleware/acl.js');
const oauth=require('../oauth.js')

authRouter.post('/signup', async (req, res, next) => {
  try {
    let user = new User(req.body);
    const userRecord = await user.save();
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message)
  }
});

authRouter.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

// read
authRouter.get('/user', bearerAuth, acl('read'), (req, res) => {
  res.json({ user: req.user });
});


authRouter.get('/oauth', oauth, (req, res) => {

  res.json({ token: req.token, user: req.user })
});



module.exports = authRouter;