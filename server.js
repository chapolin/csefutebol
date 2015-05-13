var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/historia', function (req, res) {
	res.render('history');
});

app.get('/time', function (req, res) {
	res.render('team');
});

app.get('/fotos', function (req, res) {
	res.render('fotos');
});

var server = app.listen(port, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
