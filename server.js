const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello world')
})

let PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`))