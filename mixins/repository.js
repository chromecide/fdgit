if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['git-fs/lib'], function(nodegit){
    console.log(nodegit);
    var mixin = {
        //called when first mixing in the functionality
        init: function(cfg, callback){
            var self = this;
            var errs = false;
            
            for(var key in cfg){
                self.set('gitrepo.'+key, cfg[key]);
            }

            delete cfg.type;

            self.mixin('FluxData/http/server', cfg, function(){
                self.on('http.request', function(req){
                    var self = this;
                    var request = req.get('request');
                    var response = req.get('response');

                    if(request.method=='POST'){
                        var info;
                        info = JSON.parse(request.body.payload);
                        var commits = info.commits;
                        for(var i=0;i<commits.length;i++){
                            var evData = commits[i];
                            evData.ref = info.ref;
                            evData.repository = info.repository;

                            self.emit('git.commit', evData);
                        }

                        req.publish('header', {
                            name: 'Set-Cookie',
                            value: 'test=1;'
                        }).publish('content', {
                            content: 'thanks'
                        }).publish('end', {});

                    }else{
                        response.writeHead(403, {'Content-Type': 'text/plain'});
                        response.end();
                        request.connection.destroy();
                    }
                });

                if(callback){
                    callback(errs, self);
                };
            });
        },
        //called when something is published to this channel
        publish: function(topic, data){
            var self = this;
            switch(topic){
                case 'tag':
                    console.log('creating tag');
                    break;
            }
        }
    };
    
    return mixin;
});