const express = require('express');
const Post = require('../models/Post');
const router = express.Router();
const passport = require('passport');
var User = require("../models/user");


const validatePostInput = require('../validation/post');

router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));


router.get('/', (req, res) => {
    Post.find()
        .deepPopulate('likes.user user comments.likes.user comments.user comments.comments comments.comments.user comments.comments.likes.user')
        .sort({ date: -1 })
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({ success: false, msg: 'No posts found' })
        });
});


router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err =>
            res.status(404).json({ success: false, msg: 'No post found with that ID' })
        );
});

router.post(
    '/', passport.authenticate('jwt', { session: false }),
    async (req, res) => {

        var c = JSON.parse(req.body.content);
        var newPost = new Post(c);
        newPost.user = req.user.id;

        const { errors, isValid } = validatePostInput(newPost);
        if (!isValid) {
            return res.status(400).json(errors);
        }
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

                console.log(blockBlobClient.url);

                // Upload data to the blob
                const uploadBlobResponse = await blockBlobClient.upload(sampleFile.data, sampleFile.size);
                console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
                newPost.file = sampleFile.name;
                newPost.file_link = blockBlobClient.url;
            }
        }

        newPost.save().then(async post => {

            var user = await User.findOneAndUpdate({_id: req.user._id}, {$inc: { points: 1 }}, {
                returnOriginal: false
            });
            res.json(post);

        }).catch(err => res.json({ msg : "Some error occurred"}));
    }
);

router.delete(
    '/:id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.user.toString() !== req.user.id) {
                        return res
                            .status(401)
                            .json({ success: false, msg: 'User not authorized' });
                    }

                    post.remove().then(() => res.json({ success: true }));
                })
                .catch(err => res.status(404).json({ success: false, msg: 'No post found' }));
    }
);

router.post(
    '/like/:id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.findOne({ _id: req.user._id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(like => like.user.toString() === req.user.id)
                            .length > 0
                    ) {
                        return res
                            .status(400)
                            .json({ success: false, msg: 'User already liked this post' });
                    }

                    post.likes.unshift({ user: req.user.id });
                    var liker_role = profile.role;

                    post.save().then(async post => {
                        var author = await User.findById(post.user.toString());

                        var total_likes = post.likes;
                        var cnt = 0;
                        var inc = 0;
                        await Promise.all(total_likes.map(async like => {
                            var userObj = await User.find({_id: like.user.toString(), role: liker_role});
                            if(userObj)
                                cnt++;
                        }));
                        if(liker_role === 1) {
                            if(cnt-5 === 0)
                                inc = 5;
                            else if(cnt-11 === 0)
                                inc = 7.5;
                            else if(cnt-16 === 0)
                                inc = 10;
                        }
                        else if( liker_role === 2) {
                            if(cnt-1 === 0)
                                inc = 0.5;
                            else if(cnt-2 === 0)
                                inc = 1.5;
                        }
                        else if(liker_role === 3) {
                            if(cnt-1 === 0)
                                inc = 1;
                            else if(cnt-2 === 0)
                                inc = 2.5;
                            else if(cnt-3 === 0)
                                inc = 4;
                            else if(cnt-4 === 0)
                                inc = 6;
                            else if(cnt-5 === 0)
                                inc = 7.5;
                        }
                        var user = await User.findOneAndUpdate({_id: profile._id}, { $inc: { points: inc }}, {
                            returnOriginal: false
                        });
                        res.json(post)
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(404).json({ success: false, msg: 'No post found' })
                });
        });
    }
);

router.post(
    '/unlike/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        User.findOne({ user: req.user.id }).then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (
                        post.likes.filter(like => like.user.toString() === req.user.id)
                            .length === 0
                    ) {
                        return res
                            .status(400)
                            .json({ success: false, msg:  'You have not yet liked this post' });
                    }

                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);

                    post.likes.splice(removeIndex, 1);

                    post.save().then(post => {
                        var likeCount = post.likes.length;
                        if(likeCount % 3 === 0)
                        {
                            User.findOneAndUpdate({ id: req.user.id }, {$dec : { points: 5} },{
                                returnOriginal: false
                            }, (err, doc) => {
                                if(err)
                                    res.send(400);
                                else
                                    res.send(200).json(post);
                            })
                        }
                        res.send(200).json(post)
                    });
                })
                .catch(err => res.status(404).json({success: false, msg:  'No post found' }));
        });
    }
);

router.post(
    '/comment/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validatePostInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        Post.findById(req.params.id)
            .then(post => {
                const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id
                };

                post.comments.unshift(newComment);

                post.save().then(post => res.send(200).json(post));
            })
            .catch(err => res.status(404).json({ success: false, msg: 'No post found' }));
    }
);

router.delete(
    '/comment/:id/:comment_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Post.findById(req.params.id)
            .then(post => {
                if (
                    post.comments.filter(
                        comment => comment._id.toString() === req.params.comment_id
                    ).length === 0
                ) {
                    return res
                        .status(200)
                        .json({ success: true, msg: 'Comment does not exist' });
                }

                const removeIndex = post.comments
                    .map(item => item._id.toString())
                    .indexOf(req.params.comment_id);

                post.comments.splice(removeIndex, 1);

                post.save().then(post => res.json(post));
            })
            .catch(err => res.status(404).json({ success: false, msg: 'No post found' }));
    }
);

module.exports = router;