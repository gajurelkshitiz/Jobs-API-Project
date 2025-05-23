const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please provide name'],
        minLength: 3,
        maxLength: 20
    },
    email : {
        type: String,
        required: [true, 'Please provide Email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Email Not Valid' ],
        unique: true,
    },
    password : {
        type: String,
        required:[true, 'Please Enter Password'],
        minLength:5,
    }
})


userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


userSchema.methods.createJWT = function(){
    return jwt.sign({ userId:this._id, name:this.name }, 
                    process.env.JWT_SECRET, 
                    {  expiresIn: process.env.JWT_LIFETIME  })
}

userSchema.methods.checkPassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', userSchema)