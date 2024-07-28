const managePartials = (req, res, next) => {
    res.locals.isNewLinkClicked = false;
    res.locals.isShowing = false;
    next();
}

module.exports = {
    managePartials,
}