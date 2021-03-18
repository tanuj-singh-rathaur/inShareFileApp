const express = require('express')
const File = require('../models/file')
const router = express.Router()
const path = require('path')


router.get('/:uuid', async (req, res) => {

    const file = await File.findOne({ uuid: req.params.uuid })

    if (!file)
        return res.render('download', { error: 'link has been expired' })

    const filePath = `${__dirname}/../${file.path}`
    console.log(filePath)
    console.log(file.path)
    res.download(filePath)
})

module.exports = router