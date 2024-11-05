const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
var cors = require('cors')
const taskRoutes = require('./src/routes/taskRoutes')
const userRoutes = require('./src/routes/userRoutes')

var allowlist = ['http://localhost:5173', 'http://127.0.0.1:5173']
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

async function main() {
    await mongoose.connect('mongodb+srv://sujithkaruvanchery:1234567890@maincluster.zd6yw.mongodb.net/?retryWrites=true&w=majority&appName=MainCluster');
    console.log("DATABASE CONNECTED")
}


main().catch(err => console.log(err));

app.use(cors(corsOptionsDelegate))

app.use(express.json())

app.use('/task/', taskRoutes)
app.use('/user', userRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
