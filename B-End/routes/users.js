var express = require('express');
const passport = require("passport");
var router = express.Router();
const User = require('../models/user');

var validateCompleteProfile = require("../validation/profile");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/profile', async function(req, res) {
  User.findOne({username: req.body.username})
      .then(user => res.status(200).json(user))
      .catch(err => res.status(400).json(err))
});

router.post('/complete',  async (req,res) => {
  const { errors, isValid } = validateCompleteProfile(req.body.employment);
  console.log(errors);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  console.log(req.body);
  const username = req.body.username;
  const employment = req.body.employment;
  console.log(username);

//   User.updateOne({ username }, 
//     { username, employment }, function (err, docs) {
//     if (err){
//       errors.username = 'User not found';
//       console.log(err)
//     }
//     else{
//         console.log("Updated Docs : ", docs);
//     }
// });

  User.findOne({ username }).then(user => {

    if (!user) {
      errors.username = 'User not found';
      return res.status(404).json(errors);
    }

    user.employment = employment;
    user.save()
      .then(user => res.send(200))
      .catch(err => res.send(500));
  })
});

module.exports = router;
