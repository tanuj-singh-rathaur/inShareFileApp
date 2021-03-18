const express = require('express')
const multer = require('multer')
const path = require('path')
const File = require('../models/file')
const router = express.Router()
const { v4: uuid4 } = require('uuid')
const sendMail = require('../services/sendingemails')
const emailTemplate = require('../services/emailTemplate')




router.get('/test', (req, res) => {
    res.send("hello Get")
})


router.post('/test', (req, res) => {

    console.log(req.file)
    res.send("hello Post")
})


const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        cb(null, uniqueName)
    }
})

let upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 * 100 }
}).single('myfile')

router.post('/', (req, res) => {

    upload(req, res, async (err) => {

        // validating the request
        if (!req.file) {
            return res.json({ error: 'All fields are required.' })
        }

        if (err)
            return res.status(500).send({ error: err.message })

        //store in database

        const file = new File({
            filename: req.file.filename,
            size: req.file.fileSize,
            path: req.file.path,
            uuid: uuid4()
        })

        const response = await file.save()

        //sending the response

        return res.json({ file: `${process.env.APP_Base_URL}/files/${response.uuid}` })
        //http://localhost:3000/filessdad


    })
})
router.post('/send', async (req, res) => {
    const { uuid, emailFrom, emailTo } = req.body


    //validating request
    if (!uuid || !emailFrom || !emailTo)
        return res.status(422).send({ error: 'All Fields Are Required' })

    //fetching data from database
    const file = await File.findOne({ uuid: uuid })

    if (file.reciever == `${emailTo}`) {
        return res.status(422).send({ error: 'Email already sent' })
    }

    file.sender = emailFrom
    file.reciever = emailTo
    const response = await file.save()

    //send mail
    const subject = `inShare File Sharing`
    const text = `${emailFrom} has shared a file with you`
    const downloadLink = `${process.env.APP_BASE_URL}/files/${file.uuid}`
    const size = parseInt(file.size / 1000) + ' KB'
    const expires = '24 hours'


    sendMail(emailTo, subject, text, emailTemplate({
        emailFrom, downloadLink, size, expires
    }))

    return res.send({ "message": "Email Sent Successfully !!" })


})

module.exports = router