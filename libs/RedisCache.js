var redisConnection = null, Redis = require("ioredis"), TTL_ONE_WEEK = 604800;

var RedisCache = exports.RedisCache = function (properties) {
  if(!redisConnection) {
    if(properties) {
      redisConnection = new Redis(properties);
    } else {
      redisConnection = new Redis();
    }
    
    redisConnection.on("ready", function() {
			console.log("Redis is ready!");
		});
		
		redisConnection.on("end", function() {
			console.error("Could not connect to Redis: Connection refused");
		});
  }
  
  this.conn = redisConnection;
};

RedisCache.prototype.put = function(key, value, ttl) {
  if(!ttl) {
    ttl = TTL_ONE_WEEK;
  }
  
  this.conn.setex(key, ttl, JSON.stringify(value));
};

RedisCache.prototype.get = function(key, callback) {
  this.conn.get(key).then(function(data) {
    if(data) {
      callback(JSON.parse(data));
    } else {
      callback({});
    }
  });
};

RedisCache.prototype.remove = function(key) {
  this.conn.del(key);
};
