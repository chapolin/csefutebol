(function() {
  "use strict";
  
  var Repository = require("./Repository").Repository, Util = require("../libs/Util").Util;
  
  var GameRepository = exports.GameRepository = function() {
    this.key = "game";
    this.collecion = "game";
  };
  
  Util.extend(GameRepository, Repository);
})();
