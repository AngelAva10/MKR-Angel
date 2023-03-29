
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('../global/errorHandling/middleware/errorHandler');
const app = express();
const cookieParser = require('cookie-parser');

// Global middlewares
// app.use(helmet());
// app.use(helmet.frameguard());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Configuring cookie-parser
app.use(cookieParser()); 

// Routes

app.use('/api', require('../tasks/tasks.routes'));
app.use('/api', require('../projects/projects.routes'));
app.use('/api', require('../users/users.routes'));
app.use('/api', require('../files/files.routes'));
app.use('/api', require('../payments/payments.routes'));
app.use('/api/oauth', require('../oauth/oauth.routes'));
app.use('/', require('../usuario/usuario.routes'))




app.use('*', (req, res, next) => {
    res.status(400).json({ message: 'Not found' });
});

app.use(errorHandler);

module.exports = app;