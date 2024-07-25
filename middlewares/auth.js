const resetError = (req, res, next) => {
    res.locals.userTaken = '';
    res.locals.passBad = '';
    next();
}

const loginError = (req, res, next) => {
    res.locals.loginFailed = '';
    next();
}

const passUser = (req, res, next) => {
    res.locals.user = req.session.user;
    next();
}

module.exports = {
    resetError,
    loginError,
    passUser,
}