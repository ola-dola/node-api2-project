const express = require('express');
const cors = require('cors');
const ringsRouter = require('./data/db-router');

const server = express();

//middlewares?
server.use(express.json());
server.use(cors());
server.use('/api/posts', ringsRouter);

server.get('/', (req, res) => {
    res.status(200);
    res.send(`
    <h1 style="color:blue">I'm alive!</h1>
    `)
})

module.exports = server;