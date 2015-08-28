var Redis = require("../libs/RedisCache").RedisCache, 
    redis = new Redis(), TTL_FIVE_MINUTES = 300;

module.exports = function(app) {
  // Crud players insert: start
  app.post('/player', function(request, response) {
    if(fieldIsValid(request, "name")) {
  		var player = {}, collection = mongo.collection('player');

  		player.name = request.body.name;
  		player.position = request.body.position ? request.body.position : null;
  		player.score = request.body.score ? request.body.score : null;
      player.image = request.body.image ? request.body.image : null;

  		collection.insert(player, {w:1}, function(error, data) {
  				if(!error) {
  					console.log("Player inserted!");
            
            // Saving Redis
            redis.put("player:" + data.ops[0]._id, player);

  					response.json(data);
  				}

  				response.end();
  		});
  	} else {
      response.json({error: "invalid data!"});
    }
  });
  // Crud players insert: end
  
  //TODO: Corrgir Atualizacao
  
  // Crud players update: start
  app.put('/player/:id', function(request, response) {
    if(fieldIsValid(request, "name") || fieldIsValid(request, "position") || 
      fieldIsValid(request, "score") || fieldIsValid(request, "image")) {
  		var collection = mongo.collection('player'), player = {}, 
          id = request.params.id;

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
      
  		collection.update({_id: global.mongodb.ObjectID(id)}, 
        { $set: player }, {w:1}, function(error, data) {
  				if(!error) {
  					console.log("Player updated!");

            // Updating Redis
            redis.put("player:" + id, player);

  					response.json(data);
  				}

  				response.end();
  		});
  	} else {
      response.json({error: "invalid data!"});
    }
  });
  // Crud players update: end
  
  // Crud players get one: start
  app.get('/player/:id', function(request, response) {
    var id = request.params.id;
    
    redis.get("player:" + id, function(data) {
      if(!data.hasOwnProperty("_id")) {
        var collection = global.mongo.collection('player');

        collection.findOne({ _id: global.mongodb.ObjectID(id) }, function(error, data) {
          if(!error) {
            var key = "player:" + id;
            
            if(data) {
              // Saving Redis
              redis.put(key, data);
            } else {
              data = {_id: -1};
              // Saving Redis
              redis.put(key, data, TTL_FIVE_MINUTES);
            }
              
            response.json(data);
          }
          
          response.end();
        });  
      } else {
        response.json(data);
      }
    });
  });
  // Crud players get one: end
  
  // Crud players list all: start
  app.get('/players', function(request, response) {
  		var collection = global.mongo.collection('player');
      
      collection.find().sort({ name: 1 }).toArray(function(error, data) {
        response.json(data);
      });
  });
  // Crud players list all: end
  
  // Crud players delete: start
  app.delete('/player/:id', function(request, response) {
  		var collection = global.mongo.collection('player'), 
          id = request.params.id;
      
      collection.remove({_id: global.mongodb.ObjectID(id)}, function(error, data) {
        if(!error) {
          console.log("Player removed!");
          
          // Removing Redis
          redis.remove("player:" + id);
          
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
