const server = require('./server');
const port = 4010;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});