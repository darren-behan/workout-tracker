// Requiring our index model
var db = require("../models");

// Routes
module.exports = function(app) {
  // GET route for getting all of the workouts
  app.get('/api/workouts', async (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // POST route for creating a workout
  app.post('/api/workouts', async ({body}, res) => {
    const workout = new db.Workout(body);
    db.Workout.create(workout)
      .then(dbWorkout => {
        console.log(dbWorkout);
      })
      .catch(err => {
        console.log(err);
      });
  });

  // GET route for workouts data to render on stats page
  app.get('/api/workouts/range', async (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
};
