var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongo = null;
var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectID;
var MongoClient = mongodb.MongoClient;
var methodOverride = require('method-override');

// Connect to the DB
MongoClient.connect(
		"mongodb://cse:csesenha@ds053448.mongolab.com:53448/heroku_xwm5hgrr",
		function(err, db) {
	mongo = db;

  if(!err) {
    console.log("We are connected in mongodb :)");
  }
});

app.use(express.bodyParser());
app.use(methodOverride('X-HTTP-Method-Override'));
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

// Crud news insert: start
app.post('/news', function(request, response) {
	if(request.body.hasOwnProperty("title") &&
			request.body.hasOwnProperty("text") &&
			request.body.hasOwnProperty("author")) {

		var collection = mongo.collection('news'), news = {};

		news.title = request.body.title;
		news.text = request.body.text;
		news.author = request.body.author;

		collection.insert(news, {w:1},
			function(err, result) {
				if(!err) {
					console.log("News Inserted!", result.ops);

					response.json(result);
				}

				response.end();
		});
	}
});
// Crud news insert: end

// Crud news update: start
app.post('/news/:id', function(request, response) {
	if(request.body.hasOwnProperty("title") &&
			request.body.hasOwnProperty("text") &&
			request.body.hasOwnProperty("author")) {

		var collection = mongo.collection('news'), news = {};

		news._id = request.params.id;
		news.title = request.body.title;
		news.text = request.body.text;
		news.author = request.body.author;

		console.log(ObjectId(news._id));

		collection.update({ _id : ObjectId(news._id) }, { $set: news }, function( err, result ) {
		        if(!err) {
							console.log("News Updated!", result.ops);

							response.json(result);
						}

						response.end();
		    }
		);
	}
});
// Crud news update: end

// Crud news list all: start
app.get('/news', function(request, response) {
		var collection = mongo.collection('news');

		news._id = request.params.id;
		news.title = request.body.title;
		news.text = request.body.text;
		news.author = request.body.author;

		console.log(ObjectId(news._id));

		collection.update({ _id : ObjectId(news._id) }, { $set: news }, function( err, result ) {
		        if(!err) {
							console.log("News Updated!", result.ops);

							response.json(result);
						}

						response.end();
		    }
		);
});
// Crud news list all: end

var server = app.listen(port, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Server up at http://%s:%s', host, port);
});
