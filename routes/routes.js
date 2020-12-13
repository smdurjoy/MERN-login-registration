const express = require('express')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

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

router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body

        if(!email || !password)
            return response.status(400).json({msg: "Not all fields have been entered !"})

        const user = await User.findOne({email: email})
        if(!user)
            return response.status(400).json({msg: "No account with this email have been found !"})
        
        const isMatched = await bcrypt.compare(password, user.password)
        if(!isMatched)
            return response.status(400).json({msg: "Invalid Credentials !"})
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        response.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        })

    } catch (error) {
        response.status(500).json({error: error.message})
    }
})

router.delete('/delete', auth, async (req, res) => {
    try {
        const deleteUser = await User.findById(req.user)
        res.json(deleteUser)
    } catch (error) {
        response.status(500).json({error: error.message})
    }
})

router.post('/isTokenValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token')
        if(!token) return res.json(false)

        const varified = jwt.verify(token, process.env.JWT_SECRET)
        if(!varified) return res.json(false)

        const user = await User.findById(varified.id)
        if(!user) return res.json(false)

        return res.json(true)

    } catch (error) {
        response.status(500).json({error: error.message})
    }
})

module.exports = router