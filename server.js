const express = require('express');
const cors = require('cors');

const server = express();

//middlewares?
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.status(200);
    res.send(`
    <h1 style="color:blue">I'm alive!</h1>
    `)
})

module.exports = server;