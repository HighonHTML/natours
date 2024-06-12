const fs = require("fs");

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`, "utf-8")
);

exports.createUser = (req, res) => {
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

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not defined yet",
  });
};

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not defined yet",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "this route is not defined yet",
  });
};
