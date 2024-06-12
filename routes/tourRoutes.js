const express = require("express");
const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
);

const getAllTours = (req, res) => {
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

const updateTour = (req, res) => {
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

const router = express.Router();

router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;