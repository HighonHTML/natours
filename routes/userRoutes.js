const express = require("express");
const fs = require("fs");

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, "utf-8")
);

const createUser = (req, res) => {
  // const newId = parseFloat(users[users.length - 1]._id.slice(-1)) + 1;
  // const newUser = Object.assign({ _id: newId }, req.body);
  // users.push(newUser);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/users.json`,
  //   JSON.stringify(users),
  //   (err) => {
  //     res.status(201).json({
  //       status: "success",
  //       data: {
  //         user: newUser,
  //       },
  //     });
  //   }
  // );
  res.status(500).json({
    status: "error",
    message: "this route is not defined yet",
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not defined yet",
  });
};

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not defined yet",
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not defined yet",
  });
};

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
