var Redis = require("../libs/RedisCache").RedisCache, redis = new Redis(), 
    PlayerRepository = require("../repository/Player").PlayerRepository, 
    Util = require("../libs/Util").Util;

module.exports = function(app) {
  var repository = new PlayerRepository();

  // Crud players insert: start
  app.post('/player', function(request, response) {
    if(Util.findAttribute(request.body, "name")) {
  		var player = {};

  		player.name = request.body.name;
  		player.position = request.body.position ? request.body.position : null;
  		player.score = request.body.score ? request.body.score : null;
      player.image = request.body.image ? request.body.image : null;

      repository.insert(player, function(data) {
        response.json(data);
      });
  	} else {
      response.json({error: "invalid data!"});
    }
  });
  // Crud players insert: end
  
  //TODO: Corrgir Atualizacao
  
  // Crud players update: start
  app.put('/player/:id', function(request, response) {
    if(Util.findAttribute(request.body, "name") || Util.findAttribute(request.body, "position") || 
      Util.findAttribute(request.body, "score") || Util.findAttribute(request.body, "image")) {
  		var collection = mongo.collection('player'), player = {}, 
          id = request.params.id;

      if(Util.findAttribute(request.body, "name")) {
        player.name = request.body.name;  
      }
      
      if(Util.findAttribute(request.body, "position")) {
        player.position = request.body.position;
      }
      
      if(Util.findAttribute(request.body, "score")) {
        player.score = request.body.score;  
      }
  		
  		if(Util.findAttribute(request.body, "image")) {
        player.image = request.body.image;
      }
      
  		repository.update(id, player, function(data) {
        response.json(data);
      });
  	} else {
      response.json({error: "invalid data!"});
    }
  });
  // Crud players update: end
  
  // Crud players get one: start
  app.get('/player/:id', function(request, response) {
    repository.get(request.params.id, function(data) {
      response.json(data);
    });
  });
  // Crud players get one: end
  
  // Crud players delete: start
  app.delete('/player/:id', function(request, response) {
    repository.delete(request.params.id, function(data) {
      response.json(data);
    });
  });
  // Crud players delete: end
  
  // Crud players list all: start
  app.get('/players', function(request, response) {
      var collection = global.mongo.collection('player'), players = [], count = 0;
      
      redis.getAll("player:*", function(error, rows) {
        getRecursivePlayers(rows, function() {
          players.sort(byName);

          response.json(players);
        });
      });

      var byName = function(a, b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();

        return x < y ? -1 : x > y ? 1 : 0;
      };

      var getRecursivePlayers = function(rows, callbackFinal) {
        redis.get(rows[count], function(data) {
          if(data && data._id !== -1) {
            players.push(data);
          }

          count++;

          if(count < rows.length) {
            getRecursivePlayers(rows, callbackFinal);
          } else {
            callbackFinal();
          }
        });
      };
  });
  // Crud players list all: end
};
