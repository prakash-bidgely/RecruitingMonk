var express = require('express');
var router = express.Router();
var Content = require("../models/content");

router.get('/test', (req, res) => res.json({ msg: 'Library Works' }));

router.post('/', (req, res) => {
    var c = req.body.content;
    var content = new Content(JSON.parse(c));

    if(req.files) {
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.file;
        console.log ( sampleFile );
        if (sampleFile.size > 0) {
            const path = __dirname + '/images/' + sampleFile.name;
            sampleFile.mv ( path, function ( err ) {
                if (err) {
                    console.log ( err );
                    res.send ( 500 );
                }
                content.pdf = path;
            } );
        }
    }
    content.save().then(doc => res.send(doc)).catch(err => {
        console.log(err);
        res.json(err)
    });
});

//Download documents previously uploaded
router.get('/', (req, res) => {
    Content.find({}, (err, doc) => {
        res.send(doc);
    })
});

router.post('/:id', function (req, res) {
    Content.find({ uploaded_by: ObjectId.fromString(req.params.id)}).deepPopulate('user').then((doc) => res.send(doc))
        .catch(err => res.send(err))
});

module.exports = router;