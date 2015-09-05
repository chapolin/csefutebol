(function() {
  "use strict";
  
  var Repository = require("./Repository").Repository, Util = require("../libs/Util").Util;
  
  var PlayerRepository = exports.PlayerRepository = function() {
    this.key = "player";
    this.collecion = "player";
  };
  
  Util.extend(PlayerRepository, Repository);
})();
