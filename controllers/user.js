const User = require('../models/user')

exports.addUser = (req, res) => {
  const username = req.body.username;
  
  const newUser = new User({
    username: username
  })
  
  newUser.save((err, result) => {
    if (err) {
      res.json({
        message: "An error occured saving new user"
      })
    }
    
    res.json({
      username: result.username,
      _id: result.id
    })
  });
}

exports.getUsers = (req, res) => {
  User.find()
  .then((results) => {
    res.json({
      users: results
    })
  })
  .catch((error) => {
    res.json({
      message: "Error happened"
    });
  });
}
