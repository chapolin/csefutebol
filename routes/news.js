module.exports = function (app) {
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
  		var collection = global.mongo.collection('news');
      
      collection.find({}).toArray(function(error, data) {
        response.json(data);
        response.end();
      });
  });
  // Crud news list all: end
};
