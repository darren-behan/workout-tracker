const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Enter an exercise type"
      },
      name: {
        type: String,
        trim: true,
        required: "Enter an exercise name"
      },
      distance: {
        type: Number
      },
      duration: {
        type: Number,
        required: "Enter an exercise duration in minutes"
      },
      weight: {
        type: Number
      },
      sets: {
        type: Number
      },
      reps: {
        type: Number
      }
    }
  ]},
  // Return all virtual properties when data is called
  {
  toJSON: {
    virtuals: true 
  }
});

// Adding an extra property to the schema
// We add "totalDuration", and the value of this is what we get returned from the function
WorkoutSchema.virtual("totalDuration").get(function() {
  // The reduce method takes in the exercises property from the Class available (Workout)
  // total starts out as 0, and it gets added the duration from exercise object
  // total continues to add the duration from object available in exercise
  // once all additions are complete, total is returned and is returned as the value of totalDuration
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;