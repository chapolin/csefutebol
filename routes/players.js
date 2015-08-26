module.exports = function(app) {
  // Crud players insert: start
  app.post('/player', function(request, response) {
    if(request.body.hasOwnProperty("name") &&
  			request.body.hasOwnProperty("position") &&
  			request.body.hasOwnProperty("score")) {

  		var collection = mongo.collection('player'), player = {};

  		player.name = request.body.name;
  		player.position = request.body.position;
  		player.score = request.body.score;
      player.image = request.body.image ? request.body.image : "";

  		collection.insert(player, {w:1}, function(error, data) {
  				if(!error) {
  					console.log("Player inserted!");

  					response.json(data);
  				}

  				response.end();
  		});
  	} else {
      response.json({error: "invalid data!"});
    }
  });
  // Crud players insert: end
  
  // Crud players update: start
  app.put('/player/:id', function(request, response) {
    if(fieldIsValid(request, "name") || fieldIsValid(request, "position") || 
      fieldIsValid(request, "score") || fieldIsValid(request, "image")) {
  		var collection = mongo.collection('player'), player = {};

      if(fieldIsValid(request, "name")) {
        player.name = request.body.name;  
      }
      
      if(fieldIsValid(request, "position")) {
        player.position = request.body.position;
      }
      
      if(fieldIsValid(request, "score")) {
        player.score = request.body.score;  
      }
  		
  		if(fieldIsValid(request, "image")) {
        player.image = request.body.image;
      }
      
  		collection.update({_id: global.mongodb.ObjectID(request.params.id)}, 
        { $set: player }, {w:1}, function(error, data) {
  				if(!error) {
  					console.log("Player updated!");

  					response.json(data);
  				}

  				response.end();
  		});
  	} else {
      response.json({error: "invalid data!"});
    }
  });
  // Crud players update: end
  
  // Crud players list all: start
  app.get('/players', function(request, response) {
  		var collection = global.mongo.collection('player');
      
      collection.find().sort({ name: 1 }).toArray(function(error, data) {
        response.json(data);
        response.end();
      });
  });
  // Crud players list all: end
  
  // Crud players delete: start
  app.delete('/player/:id', function(request, response) {
  		var collection = global.mongo.collection('player');
      
      collection.remove({_id: global.mongodb.ObjectID(request.params.id)}, function(error, data) {
        if(!error) {
          console.log("Player removed!");
          
          response.json(data);
        }
        
        response.end();
      });
  });
  // Crud players delete: end
};

var fieldIsValid = function(request, fielName) {
	if(request.body.hasOwnProperty(fielName) && request.body[fielName]) {
		return true;
	}
	
	return false;
};
