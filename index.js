if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./mixins/repository', './mixins/github_webhook'], function(repository, webhook){
    
    var mixin = {
        repository: repository,
        github:{
            webhook: webhook
        }
    };
    
    return mixin;
});