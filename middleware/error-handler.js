const  { CustomAPIError }  = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res
            .status(err.statusCode)
            .json({msg: err.message})
    }
    else {
        console.log(err)
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({msg: "Something Went Wrong!!! Error Occured."})
    }
}

module.exports = errorHandlerMiddleware