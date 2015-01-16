var raygun = require('raygun');
var raygunClient = new raygun.Client().init({ apiKey: 'EnmpuSMWF281zZjRKkwLMA==' });

var d = require('domain').create();
d.on('error', function(err){
  raygunClient.send(err, {}, function () {
    process.exit();
  });
});

d.run(function(){
  var err = new Error('phasers offline');
  throw err;
});

var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})

/*var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Node.JS!');
}).listen(8080);

console.log('Server running at http://localhost:8080/');
*/
