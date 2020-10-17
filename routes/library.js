var express = require('express');
var router = express.Router();
var Content = require("../models/content");

router.get('/test', (req, res) => res.json({ msg: 'Library Works' }));

router.post('/', (req, res) => {
    var c = req.body.content;
    console.log(c);
    var content = new Content(JSON.parse(c));
    //content.uploaded_by = ObjectId.fromString(c.uploaded_by);
    console.log(content.video);

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;
    const path = __dirname + '/images/' + sampleFile.name;
    // Use the mv() method to place the file somewhere on your server
    console.log(sampleFile);
    if(sampleFile.size  > 0) {
        sampleFile.mv ( path, function ( err ) {
            if (err) {
                console.log ( err );
                res.send ( 500 );
            }
        } );
    }
    content.pdf = path;
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