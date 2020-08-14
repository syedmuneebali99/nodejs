const fs = require('fs');

const requestHandler = (req,res) => {

    const url = req.url;
    const method = req.method;

    if(url === '/') {
    
        res.write('<html>');
        res.write('<head><title>Form</title></head>');
        res.write('<body><form method="POST" action="/message"><input type="text" name="name"><button type="submit">Submit</button></form></body>')
        res.write('</html>');
        return res.end();
    }
    
    if(url === '/message' && method === 'POST') {
    
       const body = [];
       req.on('data', (chunk) => {
          console.log(chunk);
          body.push(chunk);
       }); //data will work at every time when a chunk will make and in the second parameter we will a function just like the (req and res) so it will will execute at every data peice received
       
          return req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
          //console.log(parsedBody);
          const message = parsedBody.split('=')[1];              
          fs.writeFile('message.txt', message, (err) => {
    
             res.statusCode = 302;
             res.setHeader('Location', '/'); //Location is default 
             return res.end();
          });
       }); 
    }  
    
    res.setHeader('Content-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Server</title></head>');
    res.write('<body><h1>this is the response from Node.js</h1></body>');
    res.write('</html>');
    res.end();

};


// Ways of exporting MODULE

module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someStuff : "extra stuff for test",
// };


// module.exports.handler = requestHandler;
// module.exports.someStuff = 'Hato Alg';


// exports.handler = requestHandler;
// exports.someStuff = 'hatjo bhailog alag';
