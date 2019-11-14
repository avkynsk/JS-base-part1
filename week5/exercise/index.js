//здесь храним все события
let events = {};

module.exports = {

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        if(events[event] == undefined){
            events[event] = [];
        }
        events[event].push({
            subscriber: subscriber,
            handler: handler.bind(subscriber)
        });
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        if(events[event] !== undefined){
            for(let i = events[event].length - 1; i >= 0; --i){
                if(events[event][i].subscriber == subscriber){
                    events[event].splice(i, 1);
                    
                }
            }
            if(events[event].length == 0){
                delete events[event];
            }
        }
        if(events.hasOwnProperty(event) && subscriber == undefined){
            events[event].splice(0,events[event].length);
        }
        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        if(events[event] !== undefined){
            for(let i = 0; i < events[event].length; i++){
                events[event][i].handler();
            }
        }
        return this;
    }
};
