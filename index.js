if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['./mixins/github_webhook'], function(webhook){
    
    var mixin = {
        github: {
            webhook: webhook
        }
    };
    
    return mixin;
});