const express = require('express')
const dbConnection = require('./config/mongodb')
const cors = require('cors');
const path = require('path')
const app = express()

//routers
const uploadRouter = require('./routes/upload')
const downlodsRouter = require('./routes/downloads')
const downloadRouter = require('./routes/download')
const port = process.env.PORT || 3000


// Cors 
const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
    // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static('public'))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

//routers
app.use('/files/download', downloadRouter)
app.use('/api/files', uploadRouter)
app.use('/files', downlodsRouter)

app.get('/', (req, res) => res.render('index'))
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is active and running on port ${port}`)

})
dbConnection()



