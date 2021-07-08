const routed = require('express').Router();
const apiRoutes = require('./api');

routed.use('/api', apiRoutes);

routed.use((req, res) => {
    res.status(404).send('<h2>There is an error!</h2>');
});

module.exports = routed;