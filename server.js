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



app.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    req.headers("Access-Control-Allow-Methods", 'PUT,POST,PATCH,DELETE,GET')
    if (req.method === 'OPTIONS') {

        return res.status(200).json({})
    }
})

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
// Cors 


dbConnection()



