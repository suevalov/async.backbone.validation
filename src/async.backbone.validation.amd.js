((factory => {
    if (typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('backbone'), require('underscore'));
    } else if (typeof define === 'function' && define.amd) {
        define(['jquery', 'backbone', 'underscore'], factory);
    }
})(($, Backbone, _) => //= async.backbone.validation.js

Backbone.Validation));