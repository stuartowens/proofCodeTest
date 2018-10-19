const express = require('express');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
var cons = require('consolidate');
const bodyParser = require('body-parser');
const {Builder, By, Key, until} = require('selenium-webdriver');
require('chromedriver');
const webdriver = require('selenium-webdriver');



module.exports = function() {
    let server = express();
    let create;
    let start;

    create = function(config) {
        let routes = require('./routes');

        // Server settings
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);
        server.set('viewDir', config.viewDir);

        server.use('/app', express.static(config.viewDir));
        server.use('/images', express.static(config.imageDir));

        // Returns middleware that parses json
        server.use(bodyParser.json());

        // Setup html view engine
        server.engine('html', cons.swig);
        server.set('views', config.viewDir + 'views');
        server.set('view engine', 'html');
        server.set('views', server.get('viewDir'));
        // Connect to Mongodb
        mongoose.connect(config.dbUrl);

        // Set up routes
        routes.init(server);
    };

    start = function() {
        let hostname = server.get('hostname');
        let port = server.get('port');

        server.listen(port, function () {
            console.log('Express server listening on - http://' + hostname + ':' + port);
        });
    };

    return {
        create: create,
        start: start
    };
};
