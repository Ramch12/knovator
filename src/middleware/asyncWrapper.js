module.exports.asyncWrapper = fn => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

module.exports.functionVersion = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch (err) {
            next(err)
        }
    }
}

