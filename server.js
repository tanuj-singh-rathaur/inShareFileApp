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



// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
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



