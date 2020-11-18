
const Fitness = require("../models/fitness.js");


module.exports = function (app) {
  app.get("/api/workouts", function (req, res) {
    Fitness.find()
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.json(err)
      })
  });

  app.post("/api/workouts", function (req, res) {
    console.log("TEST")
    Fitness.create({})
      .then(data => res.json(data))
      .catch(err => {
        console.log(err)
        // res.sendStatus(500).json(err);
      });
  });

  app.get("/api/workouts/range", function (req, res) {
    Fitness.find()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // app.post("/api/workouts/range", function (req, res) {
  //   Fitness.create({})
  //     .then(data => {
  //       res.json(data);
  //     })
  //     .catch(err => {
  //       res.json(err);
  //     });
  // });

  app.put("/api/workouts/:id", ({ body, params }, res) => {
    Fitness.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    )
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.json(err);
      });
  });

}
