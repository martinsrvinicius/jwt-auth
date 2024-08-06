function authenticate(req, res, next) {
    if(!req.session || !req.session.user || req.session.user.external){
        const err = new Error("You shall not pass");
        err.statusCode = 403;
        res.status(403).json({message: 'Unauthorized!'});
        //next(err.Error);
    } else {
        next();
    }
}

module.exports = authenticate;