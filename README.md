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
Validation.validators.remote = function(deferred, value, attr, param, model) {
    // Default message
    // {0} is attr, {1} param, if param is array, then {1} is param[0], ...
    var defaultMsg = "Error in field {0}";
    var self = this;
    $.ajax({
        url: _.template(param)(model),
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(model),
        complete: function(jqxhr, status) {
            if (status !== 'success') {
                return deferred.reject();// Error at server
            }
            if (!jqxhr || !jqxhr.responseJSON) {
               return deferred.reject();// Error parsing the response
            }
            // Supposing server sends response like
            // {valid: false, errors: ['Error 1', 'Other error']}
            if (!jqxhr.responseJSON.valid) {
                var msg = jqxhr.responseJSON.errors.join(", ");
                return deferred.reject(self.format.apply(self, [msg || defaultMsg,    
                                    self.formatLabel(attr, model)].concat(param)));
            }
            return deferred.resolve();
        }
    });
};
```

Then you may use it like:

```js
var SomeModel = Backbone.Model.extend({
    defaults: {
        id: undefined,
        name: '',
        argToValidation: 10
    },
    validation: {
        name: {
            remote: '/path/to/your/validation/<%= argToValidation %>',
            msg: 'This message will be used preferentially, and only if not filled, the one from reject will be used'
        }
    }
});
```

## Dependencies

* Underscore
* Backbone
