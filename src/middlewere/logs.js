const logRequest = (req, res, next) => {
    console.log('terjadi Request ke path ' + req.path);
    next();
};

module.exports = logRequest;
