const routing = require('express').Router();
const routesAPI = require('./api');
routing.use('/api', routesAPI);
routing.use((req, res) => {

    res.status(404).send('<h3>Error!</h3>');
});


module.exports = routing;