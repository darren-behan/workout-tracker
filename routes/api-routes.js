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
    // Store the id of the workout
    const id = req.params.id;
    // Store the data from the db
    const data = req.body;
    // Find the relevant Workout by it's id
    db.Workout.findById(id)
      .then(dbWorkout => {
        // Then push the data as arrays to the exercises object and return it
        dbWorkout.exercises.push(data);
        return dbWorkout;
      })
      .then(dbWorkout => {
        // Find the Workout and add the exercises to this - guide: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
        db.Workout.findOneAndUpdate(
          { _id: id },
          { exercises: dbWorkout.exercises },
          { new: true }
        )
          .then(dbWorkout => {
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
    // We "copy" the request body to not modify the original one
    const workout = new db.Workout(body);
    // Create the Workout in the database
    db.Workout.create(workout)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
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
