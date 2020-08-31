// Requiring our index model
var db = require("../models");

// Routes
module.exports = function(app) {
  // This request returns all workouts
  app.get('/api/workouts', async (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
};
