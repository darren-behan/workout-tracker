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

  // PUT route for adding/updating the exercise in the workout collection
  app.put('/api/workouts/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    db.Workout.findById(id)
      .then(dbWorkout => {
        dbWorkout.exercises.push(data);
        console.log(dbWorkout + " line 25");
        return dbWorkout;
      })
      .then(dbWorkout => {
        console.log(dbWorkout + " line 29");
        db.Workout.findOneAndUpdate(
          { _id: id },
          { exercises: dbWorkout.exercises },
          { new: true }
        )
          .then(dbWorkout => {
            console.log(dbWorkout + " line 36");
            res.json(dbWorkout);
          })
          .catch(err => {
            res.json(err);
          });
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
