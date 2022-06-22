const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const parseString = require('xml2js').parseString;
const shell = require('shelljs');
const nodeCron = require('node-cron');

app.use(bodyParser.json());
app.use(bodyParser.raw({ type: function() {
        return true;
    },

    limit: '5mb'
}
));

const apiRoute = require('./routes/api.routes.js');

// using as middleware
app.use('/', apiRoute);

app.get('/', function(req, res){
   res.send("Hello world!");
});

const port = process.env.PORT || 3898;
app.listen(port, function () {
    console.log('Listening to e-Mola API App on port ' + port);

    // Connect REDIS Database
    /*
    client.on('connect', function() {
        console.log('Redis connected ...')
    });
*/

});