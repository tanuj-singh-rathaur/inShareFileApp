const express = require('express')
const dbConnection = require('./config/mongodb')
const path = require('path')
const app = express()

//routers
const uploadRouter = require('./routes/upload')
const downlodsRouter = require('./routes/downloads')
const downloadRouter = require('./routes/download')
const port = 3000 || process.env.PORT

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => {
    console.log(`Server is active and running on port ${port}`)

})
app.use(express.json())
app.use(express.static('public'))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

//routers
app.use('/files/download', downloadRouter)
app.use('/api/files', uploadRouter)
app.use('/files', downlodsRouter)


dbConnection()



