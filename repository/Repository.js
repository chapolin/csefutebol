(function() {
  "use strict";
  
  var Redis = require("../libs/RedisCache").RedisCache, _ = require("lodash"), 
      redis = new Redis(), TTL_FIVE_MINUTES = 300;

  var Repository = exports.Repository = function () {};
  
  Repository.prototype.get = function(id, callback) {
    var key = this.getKey() + this.getSeparator() + id, self = this;
    
    redis.get(key, function(data) {
      if(!data.hasOwnProperty("_id")) {
        var collection = global.mongo.collection(self.getCollection());

        collection.findOne({ _id: global.mongodb.ObjectID(id) }, function(error, data) {
          if(error) {
            console.error("Error getting data from mongodb. By key: ", key);
            
            data = {error: error, origin: "mongodb"};
          } else if(data) {
            // Saving Redis
            redis.put(key, data);
          } else {
            data = {_id: -1, origin: "mongodb", msg: "not found"};
            // Saving Redis
            redis.put(key, data, TTL_FIVE_MINUTES);
          }
          
          callback(data);
        });  
      } else {
        callback(data);
      }
    });
  };
  
  Repository.prototype.insert = function(value, callback) {
    var collection = mongo.collection(this.getCollection()), self = this;
    
    collection.insert(value, {w:1}, function(error, data) {
        if(!error) {
          console.log("%s inserted!", self.getCollection());
        
          var key = self.getKey() + self.getSeparator() + data.ops[0]._id;
          
          // Saving in redis
          redis.put(key, value);
        }
        
        callback(data);
    });
  };
  
  Repository.prototype.update = function(key, value, callback) {
    var collection = mongo.collection(this.getCollection()), 
        keyRedis = this.getKey() + this.getSeparator() + key, self = this;
    
    this.get(key, function(dataToUpdate) {
      if(dataToUpdate) {
        _.assign(dataToUpdate, value);
        
        collection.update({_id: global.mongodb.ObjectID(key)}, 
          { $set: value }, {w:1}, function(error, data) {
            if(!error) {
              console.log("%s updated!", self.getCollection());

              // Saving in redis
              redis.put(keyRedis, dataToUpdate);
            }

            callback(data);
        });
      } else {
        callback({_id: -1, origin: "repository", msg: "not found"});
      }
    });
  };
  
  Repository.prototype.delete = function(key, callback) {
    var collection = global.mongo.collection(this.getCollection()), self = this,
        keyRedis = this.getKey() + this.getSeparator() + key;
    
    collection.remove({_id: global.mongodb.ObjectID(key)}, function(error, data) {
      if(!error) {
        console.log("%s removed!", self.getCollection());
        
        // Removing Redis
        redis.remove(keyRedis);
      }
      
      callback(data);
    });
  };
  
  Repository.prototype.all = function() {};
  
  Repository.prototype.getCollection = function() {
    return this.collecion;
  };
  
  Repository.prototype.getKey = function() {
    return this.key;
  };
  
  Repository.prototype.getSeparator = function() {
    return ":";
  };
})();
