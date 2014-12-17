/*
 * Author: yuanzm
 * Last-edit-day: 2014//12/17
 */

;(function() {
    'use strict';

    var MyModel = Backbone.Model.extend();
    var MyCollection = Backbone.Collection.extend({
        url: '/questions',
        model: MyModel
    });
    var coll = new MyCollection;
    coll.fetch({
        error: function (collection, response) {
            console.log('error', response);
        },
        success: function (collection, response) {
            console.log('success', response);
        }
    });

})()