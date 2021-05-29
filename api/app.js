require('dotenv').config();
const Server = require('./models/server');
const { conn } = require('./database/db.js');

const server = new Server();

//sincronizamos la db
conn.sync({ force: false })
    .then(function () {
        //iniciamos el server
        server.listen();
    });


