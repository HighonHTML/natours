const express = require("express");
const tourController = require("./../controllers/tourController");

const { checkBody, checkId, getAllTours, createTour, getTour, updateTour, deleteTour } =
  tourController;

const router = express.Router();

router.param("id", checkId);

router.route("/").get(getAllTours).post(checkBody, createTour);
router.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
