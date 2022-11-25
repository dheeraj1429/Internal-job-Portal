require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require('cors');
const logger = require('morgan');
const databaseConnection = require('./model/database/db');
const path = require('path');

// middlewares
app.use(
   cors({
      origin: 'http://localhost:3000',
   })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));
app.use(logger());

// routs
const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');
const indexRoute = require('./routes/indexRoute');

app.use('/auth', authRoute);
app.use('/admin', adminRoute);
app.use('/index', indexRoute);

// server listen
databaseConnection(() =>
   app.listen(PORT, () => {
      console.log(`server running in port ${PORT}`);
   })
);
