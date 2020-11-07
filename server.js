const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });


db.Fitness.create({ name: "Running" })
  .then(dbFitness => {
    console.log(dbFitness);
  })
  .catch(({ message }) => {
    console.log(message);
  });

app.get("/exercise", (req, res) => {
  db.Fitness.find({})
    .then(dbFitness => {
      res.json(dbFitness);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/stats", ({ body }, res) => {
    db.Fitness.create(body)
      .then(({ _id }) => db.Fitness.findOneAndUpdate({}, { $push: { fitness: _id } }, { new: true }))
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.put("/markread/:id", ({ params }, res) => {
    db.Fitness.update(
      {
        _id: mongojs.ObjectId(params.id)
      },
      {
        $set: {
          read: true
        }
      },
  
      (error, edited) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log(edited);
          res.send(edited);
        }
      }
    );
  });
  
  app.put("/stats/:id", ({ params }, res) => {
    db.Fitness.update(
      {
        _id: mongojs.ObjectId(params.id)
      },
      {
        $set: {
          read: false
        }
      },
  
      (error, edited) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log(edited);
          res.send(edited);
        }
      }
    );
  });
  
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  
