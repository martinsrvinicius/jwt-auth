function authenticateexternal(req, res, next) {
    if(req.session && (req.session.externaluser || req.session.user)) {
        next();
    } else {
        const err = new Error('You shall not pass');
        err.statusCode = 403;
        res.status(403).json({message: 'Unauthorized!'})
    }
}

module.exports = authenticateexternal;
