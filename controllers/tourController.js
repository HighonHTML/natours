const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, "utf-8")
);

exports.checkBody = (req, res, next) => {
  if (!("name" in req.body && "price" in req.body)) {
    return res.status(400).json({
      status: "bad request ",
      message: "required properties are missing",
    });
  }
  next();
};

exports.checkId = (req, res, next, val) => {
  if (val > tours.length) {
    console.log("invalid");
    return res.status(404).json({
      status: "failure",
      message: "invalid ID",
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log("getting");
  res.status(200).json({
    status: "success",
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
