const routing = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

routing.use('/users', userRoutes);
routing.use('/thoughts', thoughtRoutes);

module.exports = routing;