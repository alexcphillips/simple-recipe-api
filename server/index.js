const express = require("express");
const app = express();
app.use(express.json());

const routes = require("./routes");

app.use("/", routes);
app.listen(3000, () => {
  console.log("Connected to server SUCCESSFULLY");
});

module.exports = app;
