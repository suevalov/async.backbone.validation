# Async.Backbone.Validation

Extension for Backbone.Validation plugin (https://github.com/thedersen/backbone.validation), which allows to declare and use asynchronous validation rules.

### Configure

How to configure plugin see in docs for Backbone.Validation plugin (http://github.com/thedersen/backbone.validation).

### Using asynchronous validation rules

```js
var SomeModel = Backbone.Model.extend({
  validation: {
    name: {
      required: true
    },
    someAttribute: {
		fn: function(deffered, model, value, attr) {
		    	someAsyncRequest()
		    		.done(function() {
		    			deffered.resolve();
		    		})
		    		.fail(function() {
		    			deffered.reject();
		    		});
		    },
		msg: "Validation failed."
	}
  }
});
```

## Dependencies

* Underscore
* Backbone
