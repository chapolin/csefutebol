var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render('index', {section: "home"});
});

app.get('/historia', function (req, res) {
	res.render('history', {section: "history"});
});

app.get('/time', function (req, res) {
	res.render('team', {section: "team"});
});

app.get('/elenco', function (req, res) {
	res.render('staff', {section: "staff"});
});

app.get('/agenda', function (req, res) {
	res.render('calendar', {section: "calendar"});
});

app.get('/estatisticas', function (req, res) {
	res.render('statistics', {section: "statistics"});
});

app.get('/midias', function (req, res) {
	res.render('medias', {section: "medias"});
});

app.get('/fotos', function (req, res) {
	res.render('fotos');
});

var server = app.listen(port, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
