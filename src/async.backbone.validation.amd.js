(function (factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('backbone'), require('underscore'));
    } else if (typeof define === 'function' && define.amd) {
        define(['jquery', 'backbone', 'underscore'], factory);
    }
}(function ($, Backbone, _) {

	//= async.backbone.validation.js

    return Backbone.Validation;
}));