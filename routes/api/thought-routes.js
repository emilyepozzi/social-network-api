const routing = require('express').Router();

const {

    getThoughts,
    getThoughtById, 
    
} = require('../../controllers/thought-controller');

module.exports = routing;