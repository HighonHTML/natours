const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/config.env` });
const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
