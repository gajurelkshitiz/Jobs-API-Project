const { StatusCodes } = require('http-status-codes')
const User = require('../models/user')
const { BadRequestError } = require('../errors')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    // if (!name || !email || !password) {
        //     throw new BadRequestError('Missing Required Feilds !!!')
        // }
        
    // const { name, email, password } = req.body
    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt)
    // const tempUser = {name, email, password:hashedPassword}

    const user = await User.create({...req.body})
    res.status(StatusCodes.CREATED).json({ user })
    
    
}

const login = async (req, res) => {
    res.status(StatusCodes.CREATED).json(req.body)
}

module.exports = {
    register,
    login
}