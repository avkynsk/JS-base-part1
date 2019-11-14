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

emitter
    .on('new_notification', notifications, notifications.count)
    .on('new_notification', logger, function () {
        this.logs.push('Произошло новое событие new_notification');
    })
    .on('new_notification', logger, function () {
        this.logs.push('Добавлена новая нотификация. Количество - ' + notifications.counter);
    })
    .emit('new_notification');

assert.equal(notifications.counter, 1);