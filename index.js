const express = require('express');
const app = express();
const http = require('http').Server(app);
require('dotenv').config();
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
    }
});
app.set('PORT', process.env.PORT || 3000);
app.use( express.json() );
app.use( express.urlencoded({extended: false, limit: 1000000000}) );

require('./socket')(io);


http.listen(3000, () => console.log(`server on port ${app.get('PORT')}`));