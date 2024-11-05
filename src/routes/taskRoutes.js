const express = require('express')
const router = express.Router()
const Task = require("../models/taskModel")
const jwt = require('jsonwebtoken');
const secretKey = "@Secretkey1"

router.get('/', async (req, res) => {
    let tasks = await Task.find({})
    res.send(tasks)
})

router.post('/', (req, res) => {
    console.log("New Task", req.body)
    jwt.verify(req.body.user, secretKey, function(err, decoded) {
        console.log(decoded)
      });
    // Task.create(req.body)
    res.send('ADDED SUCCESSFULLY')
})

router.put('/:id', (req, res) => {
    console.log(req.params.id)
    let id = req.params.id
    let task = req.body
    Task.findByIdAndUpdate(id, task).exec()
    res.send('EDIT TASK')
})

router.delete('/:id', (req, res) => {
    let id = req.params.id
    Task.findByIdAndDelete(id).exec()
    res.send('TASK DELETED')
})

module.exports = router