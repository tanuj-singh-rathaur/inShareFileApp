const express = require('express')
const router = express.Router()
const File = require('../models/file')
router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid })
        if (!file)
            return res.render('download', { error: 'Download Link May Have Expired' })

        return res.render('download', {
            uuid: file.uuid,
            fileName: file.fileName,
            size: file.size,
            download: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`

        })
    } catch (error) {
        return res.render('download', { error: 'Something Went Wrong' })
    }



})

module.exports = router