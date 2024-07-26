const managePartials = (req, res, next) => {
    res.locals.isNewLinkClicked = false;
    next();
}

module.exports = {
    managePartials,
}