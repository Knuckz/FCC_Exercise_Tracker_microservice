const Exercise = require('../models/exercise');
const User = require('../models/user');

exports.addExercise = (req, res) => {
  const userId = req.body.userId;
  const description = req.body.description;
  const duration = req.body.duration;  
  let date = new Date(req.body.date);
  date = date.getTime();
  
  console.log(req);
  const newExercise = new Exercise({
    _id: userId,
    description: description,
    duration: duration,
    date: date
  });
  
  newExercise.save()
  .then((result) => {
    User.findById(result._id, (err, data) => {
      res.json({
        username: data.username,
        _id: result._id,
        description: result.description,
        duration: result.duration,
        date: result.date
      });
    });
  })
  .catch((error) => {
    res.json({
      message: "An error occured",
      error: error
    });
  });
}

exports.getExercises = (req, res) => {
  const userId = req.query.userId;
  const toDate = req.query.to;
  const fromDate = req.query.from;
  const limit = req.query.limit;
  
  let query = Exercise.find({ _id: userId })
  if (limit > 0) {
    query.limit(+limit);
  }
  if(fromDate && toDate) {
    query.where('date').lte(+toDate).gte(+fromDate);
  }

  query.exec()
  .then((results) => {
    User.findById(userId, (err, data) => {
      if (data) {
        res.json({
          username: data.username,
          userId: data.id,
          log: results,
          size: results.length
        });
      }
    });
  })
  .catch((error) => res.json({ error: "An error occurred" }));
}