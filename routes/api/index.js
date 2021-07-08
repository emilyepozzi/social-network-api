const routed = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

routed.use('/users', userRoutes);
routed.use('/thoughts', thoughtRoutes);

module.exports = routed;