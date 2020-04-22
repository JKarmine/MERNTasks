const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Read token fron token
    const token = req.header('x-auth-token');

    // Check if token exists
    if (!token) {
        return res.status(401).json({ msg: 'No token. Permission denied' });
    }

    // Validate token
    try {
        const encrypted = jwt.verify(token, process.env.SECRET);
        req.user = encrypted.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid token' });
    }
}