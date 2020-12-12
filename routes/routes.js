const { request } = require('express')
const express = require('express')
const signUpTempleteCopy = require('../models/SignUpModels')
const bcrypt = require('bcrypt')

const router = express.Router()

router.post('/signup', (request, response) => {
        
    const signedUpUser = signUpTempleteCopy({
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
    })

    signedUpUser.save()
    .then(data => {
        response.json(data)
    })
    .catch(error => {
        response.json(error)
    })
})

module.exports = router