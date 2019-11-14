var assert = require('assert');

var emitter = require('./index.js');

var notifications = {
    counter: 0,
    count: function () {
        this.counter++;
    }
};

var logger = {
    logs: []
};

emitter.on('new_notification', notifications, notifications.count);

assert.equal(notifications.counter, 0);