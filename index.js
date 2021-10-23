const express = require('express');
const app = express();

require('dotenv').config();
require('./db/conexion');

app.set('PORT', process.env.PORT || 3000);
app.use( express.json() );
app.use( express.urlencoded({extended: false, limit: 1000000000}) );

app.use('/user', require('./routes/userRoute'));

app.listen(app.get('PORT'), () => console.log(`server on port ${app.get('PORT')}`));