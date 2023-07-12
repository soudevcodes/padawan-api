module.exports = {
    after: async handler => {
        console.log(JSON.stringify(handler.response.data));

        handler.response = {
            statusCode: handler.response.statusCode || 200,
            body: JSON.stringify(handler.response.data),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Credentials': true,
            },
        };
    },
    onError: async handler => {
        handler.response = {
            statusCode: handler.error?.statusCode || 500,
            body: JSON.stringify({
                message: handler.error?.message || handler.error || 'Error'
            }),
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Credentials': true,
            },
        };

        console.log(handler.error?.message || handler.error || 'Error');
    }
}