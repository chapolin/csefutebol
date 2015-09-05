(function() {
  "use strict";

  var Util = exports.Util = function () {
  };

  /**
  *  Extends one "class" with other "class" properties and methods.
  */
  Util.extend = function (receivingClass, givingClass) {
    if (arguments[2]) {
        for (var i=0, len=arguments.length; i<len; i++) {
            receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
        }
    } else {
        for (var methodName in givingClass.prototype) {
            if (!receivingClass.prototype[methodName]) {
                receivingClass.prototype[methodName] = givingClass.prototype[methodName];
            }
        }
    }
  };
  
  /**
  * Verify if field request is valid
  */
  Util.fieldIsValid = function(request, fielName) {
  	if(request.body.hasOwnProperty(fielName) && request.body[fielName]) {
  		return true;
  	}
  	
  	return false;
  };
})();
