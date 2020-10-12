var express = require('express');
var router = express.Router();
var Content = require("../models/content");

router.get('/test', (req, res) => res.json({ msg: 'Library Works' }));

router.post('/', (req, res) => {
    var content = new Content(JSON.parse(req.body.content));


    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;
    const path = __dirname + '/images/' + sampleFile.name;
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(path, function(err) {
        if (err)
            res.send(500);
    });
    content.save().then(doc => res.send(doc)).catch(err => res.send(500));
});

//Download documents previously uploaded
router.get('/', (req, res) => {
    Content.find({}, (err, doc) => {
        res.send(doc);
    })
});

router.post('/:id', function (req, res) {
    Content.find({ uploaded_by: ObjectId.fromString(req.params.id)}, (err, doc) => {
        if(err)
        {
            console.log(err);
            res.sendStatus(503);
        }
        res.send(doc);
    })
});

module.exports = router;