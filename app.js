const express = require("express");
const fs = require("fs");
const app = express();
const morgan = require("morgan");

// middlewares

app.use(express.json());

app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("welcome to middleware");
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, "utf-8")
);

// route handlers

const getTours = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = parseFloat(req.params.id);
  const tour = tours.find((tour) => tour.id === id);
  if (tour === undefined) {
    return res.status(404).json({
      status: "failure",
      messages: "invalid parameter",
    });
  }
  return res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const patchTour = (req, res) => {
  const id = parseFloat(req.params.id);
  const newTours = tours.map((tour) => {
    if (tour.id === id) {
      for (const key in req.body) {
        tour[key] = req.body[key];
      }
    }
    return tour;
  });
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    (err) => {
      res.status(204).json({
        status: "success",
        data: {
          tour: newTours[id],
        },
      });
    }
  );
};

const deleteTour = (req, res) => {
  const id = parseFloat(req.params.id);
  const updatedTours = tours.filter((tour) => tour.id !== id);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      res.status(200).json({
        status: "success",
        data: {
          updatedTours,
        },
      });
    }
  );
};

// routes

// app.get("/api/v1/tours", getTours);
// app.get("/api/v1/tours/:id", getTour);
// app.post("/api/v1/tours", createTour);
// app.delete("/api/v1/tours/:id", deleteTour);
// app.patch("/api/v1/tours/:id", patchTour);

app.route("/api/v1/tours").get(getTours).post(createTour);
app.route("/api/v1/tours/:id").get(getTour).patch(patchTour).delete(deleteTour);

// server

const port = 8000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
