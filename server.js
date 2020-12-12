const express = require('express')
const app = express()
const mogoose  = require('mongoose')
const dotenv  = require('dotenv')
const routeUrls = require('./routes/routes')
const cors = require('cors')

dotenv.config()

const config = { useNewUrlParser: true, useUnifiedTopology: true }
mogoose.connect(process.env.DATABASE_ACCESS, config, () => console.log("Connected Successfully :)"))

app.use(express.json())
app.use(cors())
app.use('/api', routeUrls)
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log('Server up and running'))