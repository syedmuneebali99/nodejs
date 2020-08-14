const http = require('http');

const routes  = require('./route');


const server = http.createServer(routes);
// console.log(routes.someStuff);

server.listen(5000), () => {
console.log('listening at port = 5000');

};

