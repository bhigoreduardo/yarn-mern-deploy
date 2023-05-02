require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./src/routes/users');

const mongoURL = process.env.SERVER_MONGO_URL;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(4040, (err) => {
    if (err) console.log('Did not connected');
    console.log('Server running on port: 4040');
  });
})