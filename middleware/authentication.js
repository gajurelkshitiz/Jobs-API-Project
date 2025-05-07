const { UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError("Authentication Invalid !!!")
    }
    else {
        const token = authHeader.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const { id, username } = decoded
            next()
        }
        catch (error) {
            throw new UnauthenticatedError('Not Allowed to access this route.')
        }
    }
}

module.exports = authenticationMiddleware