var Redis = require("../libs/RedisCache").RedisCache, redis = new Redis(), 
    PlayerRepository = require("../repository/Player").PlayerRepository, 
    GameRepository = require("../repository/Game").GameRepository, 
    Util = require("../libs/Util").Util, PLAYER_VERSUS = "000000000000";

module.exports = function(app) {
  var repository = new PlayerRepository(), repositoryGame = new GameRepository();

  // Crud score insert goal: start
  app.post('/score', function(request, response) {
    if(Util.findAttribute(request.body, "game") && 
        Util.findAttribute(request.body, "player") && 
        Util.findAttribute(request.body, "from") && 
        Util.findAttribute(request.body, "score")) {
          
      // Finding player
      repository.get(request.body.player, function(data) {
        if(data) {
          if(request.body.player !== PLAYER_VERSUS) {
            var player = {};
            
            player.score = doScore(data.score, request.body.score);
            
            // Updating score from player
            repository.update(request.body.player, player, function(data) {
              response.json(data);
            });  
          }
          
          // Finding game
          repositoryGame.get(request.body.game, function(data) {
            if(data) {
              var game = {};
              
              if(request.body.from === "own") {
                game.scoreOwn = doScore(data.scoreOwn, request.body.score);
              } else if(request.body.from === "versus") {
                game.scoreVersus = doScore(data.scoreVersus, request.body.score);
              }
              
              // Updating score from game
              repositoryGame.update(request.body.game, game, function(data) {
                response.json(data);
              });
            } else {
              response.json({error: "Game not found!"});
            }
          });
        } else {
          response.json({error: "Player not found!"});
        }
      });
  	} else {
      response.json({error: "invalid data!"});
    }
  });
  // Crud score insert goal: end
  
  var doScore = function(score, type) {
    if(type === "+") {
      return score || score === 0 ? score + 1 : 1;
    } else if(type === "-") {
      return score ? score - 1 : 0;
    }
  };
};
