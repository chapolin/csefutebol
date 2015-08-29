var express = require('express'), fs = require("fs"), path = require("path"),
app = express(), port = process.env.PORT || 3000, mongo = null,
mongodb = require('mongodb'), MongoClient = mongodb.MongoClient, 
methodOverride = require('method-override'), 
Redis = require("./libs/RedisCache").RedisCache,
routesPath = path.join(__dirname, "routes"), develop = false, 
STRING_CONNECTION = "mongodb://cse:csesenha@ds053448.mongolab.com:53448/heroku_xwm5hgrr",
redisProperties = null;

if(develop) {
	STRING_CONNECTION = "mongodb://localhost:27017";
}

// Connect to the DB
MongoClient.connect(STRING_CONNECTION, function(err, db) {
	if(!err) {
		global.mongo = db;
		global.mongodb = mongodb;

		console.log("We are connected in mongodb :)");
	}
});

// Connection to Redis
if(!develop) {
	redisProperties = {
		port: 9439,
		host: 'ec2-54-83-207-141.compute-1.amazonaws.com',
		password: 'pdsndqjcco47crfd8c5rpi8749k'
	};
}

Redis(redisProperties);

app.use(express.bodyParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

// Comming up routes
fs.readdirSync(routesPath).forEach(function(file) {
  require(__dirname + "/routes/" + file)(app);
	
	console.log("Comming up %s routes...", file);
});

var server = app.listen(port, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Server started!");
});