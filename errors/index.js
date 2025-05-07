const BadRequestError = require('./bad-request')
const notFoundError = require('./not-found')
const unauthenticatedError = require('./unauthenticated')
const CustomAPIError = require('./custom-errors')

module.exports = {
    CustomAPIError,
    BadRequestError,
    notFoundError,
    unauthenticatedError
}