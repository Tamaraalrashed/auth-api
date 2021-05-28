'use strict';
require('dotenv').config();
const app=require('./src/server.js');
const mongoose=require('mongoose');


mongoose
.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
})
.then(() => {
  app.start(process.env.PORT);
})
.catch((e) => console.log(e));




