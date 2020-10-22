
var express = require('express');
const { BlobServiceClient } = require('@azure/storage-blob');
var router = express.Router();
var Content = require("../models/content");

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

router.get('/test', (req, res) => res.json({ msg: 'Library Works' }));

router.post('/', async (req, res) => {

    var c = req.body.content;
    var content = new Content(JSON.parse(c));

    if(req.files) {
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.file;
        if (sampleFile.size > 0) {
            const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
            const containerName = "post";
            const containerClient = blobServiceClient.getContainerClient(containerName);

            // Get a block blob client
            const blockBlobClient = containerClient.getBlockBlobClient(sampleFile.name);

            console.log('\nUploading to Azure storage as blob:\n\t', sampleFile.name);

            // Upload data to the blob
            const uploadBlobResponse = await blockBlobClient.upload(sampleFile.data, sampleFile.size);
            console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
            console.log(uploadBlobResponse);
            content.pdf = sampleFile.name;
        }
    }
    content.save().then(doc => res.send(doc)).catch(err => {
        console.log(err);
        res.sendStatus(503)
    });
});

router.post('/download', async (req, res) => {
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerName = "post";
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient("10028-preview-dev.bidgely.com-dashboard-home-20200624_20-41-44.png");
    const downloadBlockBlobResponse = await blobClient.download();
    const downloaded = (
        await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
    );
    res.send(downloaded);
});

async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.on("data", (data) => {
            chunks.push(data instanceof Buffer ? data : Buffer.from(data));
        });
        readableStream.on("end", () => {
            resolve(Buffer.concat(chunks));
        });
        readableStream.on("error", reject);
    });
}

// createBlobContainer = async () => {
//     const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
//
// // Create a unique name for the container
//     const containerName = 'quickstart' + uuidv1();
//
//     console.log('\nCreating container...');
//     console.log('\t', containerName);
//
// // Get a reference to a container
//     const containerClient = blobServiceClient.getContainerClient(containerName);
//
// // Create the container
//     const createContainerResponse = await containerClient.create();
//     console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);
// };

//Download documents previously uploaded
router.get('/', (req, res) => {
    Content.find({}, (err, doc) => {
        res.send(doc);
    })
});

router.post('/:id', function (req, res) {
    Content.find({ uploaded_by: ObjectId.fromString(req.params.id)}).deepPopulate('uploaded_by author').then((doc) => res.send(doc))
        .catch(err => res.send(err))
});

module.exports = router;