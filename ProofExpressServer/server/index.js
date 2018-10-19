const express = require('express');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
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

        // Setup view engine
        server.engine('.hbs', expressHandlebars({
            defaultLayout: 'default',
            layoutsDir: config.viewDir + '/layouts',
            extname: '.hbs'
        }));
        server.set('views', server.get('viewDir'));
        server.set('view engine', '.hbs');
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

    // test = function() {
    //     let driver = new webdriver.Builder()
    //         .withCapabilities(webdriver.Capabilities.chrome())
    //         .build();
    //     (async function example() {
    //         // let driver = await new Builder().forBrowser('chrome').build();
    //         try {
    //           await driver.get('http://localhost:3000/home');
    //           await driver.findElement(By.id('memberIP')).sendKeys('201.111.240.66', Key.RETURN);
    //           await driver.findElement(By.id('loginButton')).click();
    //           const srcTag = await driver.findElement(By.id('targetImg')).getAttribute("src");
    //           console.log('srcTag', srcTag);
    //           // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    //         } finally {
    //           // await driver.quit();
    //         }
    //       })();
    // }

    return {
        create: create,
        start: start
    };
};
