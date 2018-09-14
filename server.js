var http = require('http');
var dt = require('./galexa.js'); 

http.createServer(function (req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'});

    res.write("<h1> The date and time are currently: </h1>" + "<h1>" + dt.myDateTime() + "</h1>");

       //res.write(dt.myMenu());
    res.end();

}).listen(8080);