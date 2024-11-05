const express = require('express')
const router = express.Router()
const User = require("../models/userModel")
var jwt = require('jsonwebtoken');

const secretKey = "@Secretkey1"

router.get('/', (req, res) => {
    res.send("GET ALL USERS")
})

router.post('/', async (req, res) => {
    let data = req.body
    await User.create(data)
    res.send("USER CREATED SUCCESSFULLY")
})

router.post("/login", (req, res) => {
    let data = req.body
    let email = data.email
    let password = data.password
    User.findOne({ email: email, password: password }).exec()
        .then(user => {
            console.log(user)
            if (user) {
                var token = jwt.sign({ email: email }, secretKey)
                res.json({ token: token })
            } else {

                res.send("INVALID CREDENTIALS")
            }
        })
        .catch(err => {
            console.log(err)
            res.send("LOGIN FAILED")

        })
})

module.exports = router
