const User = require('../models/user')
const { UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError("Authentication Invalid !!!")
    }
    else {
        const token = authHeader.split(' ')[1]
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            // attach the user to the job routes

            // something we use this approach too
            // const user = User.findById(payload.id).select('-password')
            // req.user = user

            req.user = {userId:payload.userId, name:payload.name}
            next()
        }
        catch (error) {
            throw new UnauthenticatedError('Not Allowed to access this route.')
        }
    }
}

module.exports = authenticationMiddleware