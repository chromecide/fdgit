if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./mixins/repository'], function(repository){
    
    var mixin = {
        repository: repository
    };
    
    return mixin;
});