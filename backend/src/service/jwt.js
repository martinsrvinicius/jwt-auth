const jwt = require('jsonwebtoken');

function getToken(username, expiration) {
    let jwtToken = jwt.sign({ name: username }, process.env.JWT_SECRET, { expiresIn: expiration });
    return jwtToken;
}

function verifyToken(token) {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
}

function getTokenNoExpire(data) {
    let jwtToken = jwt.sign(data, process.env.JWT_SECRET);
    return jwtToken;
}

module.exports = { getToken, verifyToken, getTokenNoExpire,  sign: (payload, secret, options) => jwt.sign(payload, secret, options), }