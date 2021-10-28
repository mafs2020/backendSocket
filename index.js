const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
require('./db/conexion');

app.set('PORT', process.env.PORT || 3000);
app.use( express.json() );
app.use( express.urlencoded({extended: false, limit: 1000000000}) );
app.use(morgan('dev'));
app.use(cors('*'));
app.use('/users', require('./routes/userRoute'));

app.listen(app.get('PORT'), () => console.log(`server on port ${app.get('PORT')}`));