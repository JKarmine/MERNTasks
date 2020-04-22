const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Read token fron token
    const token = req.header('x-auth-token');
    console.log(token);

    // Check if token exists

    // Validate token
}