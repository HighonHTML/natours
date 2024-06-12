const express = require("express");
const app = express();
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// middlewares

app.use(express.json());

app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("hello from middleware");
  next();
});

// mounting a new router on a routes

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// server

const port = 8000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
