const { StatusCodes }  = require('http-status-codes')
const User = require('../models/user')
const { BadRequestError, UnauthenticatedError } = require('../errors')


const register = async (req, res) => {
    const user = await User.create({...req.body})
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
    
    
}

const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide email and passwrd')
    }
    const user = await User.findOne({email})

    // Authentication fail ma code fati-rakheko chha.
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.checkPassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Incorrect Password')
    }
    // Problem yeti bich ma chha.


    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name: user.name}, token, msg:'Sucessfully Login.'})
}

module.exports = {
    register,
    login
}