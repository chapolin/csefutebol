(function() {
  "use strict";
  
  module.exports = function (app) {
    var Redis = require("../libs/RedisCache").RedisCache, redis = new Redis(), 
        GameRepository = require("../repository/Game").GameRepository, 
        repository = new GameRepository(), Util = require("../libs/Util").Util;

    // Crud games insert: start
    app.post('/game', function(request, response) {
      if(Util.fieldIsValid(request, "players")) {
    		var game = {};

    		game.players = request.body.players;
    		game.place = request.body.place ? request.body.place : null;
    		game.date = request.body.date ? request.body.date : null;
        game.versus = request.body.versus ? request.body.versus : null;
        game.friendly = request.body.friendly ? request.body.friendly : null;

        repository.insert(game, function(data) {
          response.json(data);
        });
    	} else {
       response.json({error: "invalid data!"});
      }
    });
    // Crud games insert: end
    
    // Crud players list all: start
    app.get('/games', function(request, response) {
        var collection = global.mongo.collection('game'), games = [], count = 0;
        
        redis.getAll("game:*", function(error, rows) {
          getRecursivePlayers(rows, function() {
            response.json(games);
          });
        });

        var getRecursivePlayers = function(rows, callbackFinal) {
          redis.get(rows[count], function(data) {
            if(data) {
              games.push(data);
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
})();
