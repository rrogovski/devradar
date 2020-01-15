const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

env.config();
app.use(express.json());
app.use(routes);

mongoose.connect(`${process.env.DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.listen(process.env.PORT);

console.log(`Your app ${process.env.APP_NAME} is running on port ${process.env.PORT}`);
