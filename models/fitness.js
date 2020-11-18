const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fitnessSchema = new Schema({
  day: {
    type: String, default: Date.now(),
    trim: true,
    required: "Enter a name for exercise"
  },
  exercises: [{
    name: {
      type: String,
      trim: true,
      required: "Enter a name"
    },
    duration: {
      type: String,
      trim: true,
      required: "Enter a duration"
    },
    weight: {
      type: String,
      trim: true
    },
    reps: {
      type: String,
      trim: true
    },
    sets: {
      type: String,
      trim: true
    },
    distance: {
      type: String,
      trim: true
    },
    
  }
]
},
  {
    toJSON: {
      virtuals: true
    }
  }
);

fitnessSchema.virtual("totalDuration").get(function() {
  return this.exercises.reduce((total, fitness) => {
    return total + fitness.duration;
  }, 0)
});

const Fitness = mongoose.model("Fitness", fitnessSchema);

module.exports = Fitness;