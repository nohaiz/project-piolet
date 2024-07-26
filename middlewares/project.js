const managePartials = (req, res, next) => {
    res.locals.isNewLinkClicked = false;
    res.locals.isShowing = false;
    // res.locals.userProj = '';
    next();
}

module.exports = {
    managePartials,
}