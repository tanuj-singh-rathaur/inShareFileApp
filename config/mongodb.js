const mongoose = require('mongoose')


const mongodbConnection = () => {
    mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    const connection = mongoose.connection
    connection.once('open', () => {
        console.log("database connection successful !")
    }).catch(err => {
        console.log("error during connecting !\n" + err)
    })
}
module.exports = mongodbConnection