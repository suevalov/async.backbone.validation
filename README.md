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


### Defining custom validators

You may want to define a custom validator that will be reused many times.
Here is how a remote validator may look like:

```js
// remote is name of validator
/**
  * @param deferred Object to say whether the field is valid (call .resolve())
  *                 or invalid (call.reject("Optional message"))
  * @param value Value of validated attribute
  * @param attr Name of validated attribute
  * @param param value passed to validation definition, for example:
  *                validation: {name: {remote: param}}
  * @param model Object with all fields and their values
  */
Backbone.Validation.validators.remote = function(deferred, value, attr, param, model) {
    validationViaAjax(model)
        .success(function() {
            deferred.resolve();
        })
        .fail(function() {
            deferred.reject();
        });
};
```

Then you may use it like:

```js
var SomeModel = Backbone.Model.extend({
    validation: {
        name: {
            remote: "this string will be in the param argument",
            msg: "{0} is not valid"// {0} is attr and {1} is param
        }
    }
});
```

## Dependencies

* Underscore
* Backbone
