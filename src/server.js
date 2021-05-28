'use strict';

const express = require('express');
const cors = require('cors');


const notFoundHandler = require('../src/error-handlers/404.js');
const errorHandler = require('../src/error-handlers/500.js');

const authRoutes = require('../src/auth/route.js')



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());
app.use(express.static('./src/public'));
 
app.use(authRoutes);

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error("Missing Port"); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};