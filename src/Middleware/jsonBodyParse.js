module.exports = {
    before: handler => {
        handler.event.body = JSON.parse(handler.event.body);
    },
}