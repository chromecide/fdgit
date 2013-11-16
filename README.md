fdgit
=====

Git interaction mixins for FluxData

**Post-Recieve WebHook**

```

var FluxData = require('FluxData');
var fdgit = require('fdgit');

var hook = new FluxData.Channel({
	mixins: {
		type: fdgit.github.webhook,
		port: 8080
	}
});

hook.on('git.commit', function(commitData){
	console.log(commitData.get());
});

```