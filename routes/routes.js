const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const router = express.Router()

router.post('/signup', async (request, response) => {
    try {
        let { name, email, password } = request.body

        if(!email || !password)
            return response.status(400).json({msg: "Not all fields have been entered !"})
        if(password.length < 5) {
            return response.status(400).json({msg: "Password must be at least 5 characters long ."})
        }

        const existingUser = await User.findOne({email: email})
        if(existingUser)
            return response.status(400).json({msg: "An account with this email already exists !"})

        if(!name) name = email

        const saltPassword = await bcrypt.genSalt(10)
        const securePassword = await bcrypt.hash(password, saltPassword)

        const newUser = new User({
            name,
            email,
            password: securePassword,
        })

        const savedUser = await newUser.save()
        response.json(savedUser)
    } catch (error) {
        response.status(500).json({error: error.message})
    }
})

module.exports = router