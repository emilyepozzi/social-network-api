const routing = require('express').Router();
const apiRoutes = require('./api');
routing.use('/api', apiRoutes);
routing.use((req, res) => {
    res.status(404).send('<h2>There is an error!</h2>');
});
module.exports = routing;