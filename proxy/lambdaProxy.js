'use strict';
let http = require('http');

/**
 * This node.js code is written to be used by an Amazon Lambda 'serverless'
 * web server. Because it is meant to be a simple web proxy, spinning up a server
 * to host it seemed like overkill; a perfect job for an AWS service. Note that
 * API gateway configuration will be required in addition to setting up your Lambda
 * service with this code.
 *
 * TODO: Known Issue: Doesn't play nice with https
 * 
 */
 
exports.handler = (event, context, callback) => {
    console.log(event);
    console.log('received url ' + event.url);
    return http.get({
        host: event.url
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            callback(null, body);
            /* uncomment this if you are consuming a json service
			var parsed = JSON.parse(body);
            callback({null,parsed});
			*/
        });
    });
};