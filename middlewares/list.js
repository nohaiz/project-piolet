const newListCheck = (req, res, next) => {
    res.locals.newListCheck = false;
    next();
}

module.exports = {
    newListCheck,
}