const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fitnessSchema = new Schema({
  day: {
    type: String, default: () => new Date(),
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
      type: Number,
      trim: true,
      required: "Enter a duration"
    },
    weight: {
      type: Number,
      trim: true
    },
    reps: {
      type: Number,
      trim: true
    },
    sets: {
      type: Number,
      trim: true
    },
    distance: {
      type: Number,
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