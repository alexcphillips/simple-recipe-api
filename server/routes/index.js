const express = require("express");
const recipes = require("./routes");
const router = express.Router();

router.get("/recipes", recipes.findAll);

router.get("/recipes/details/:string", recipes.findDetails);

router.post("/recipes", (req, res) => {
  let isExisting = false;
  // Loop through the nested objects using a for of loop
  for (const recipe of data) {
    if (recipe.name === req.body.name) {
      // If it exists, send an error message and status code 400 in the response
      res.status(400).send({ error: "Recipe already exists" });
      isExisting = true;
      break;
    }
  }
  // if it doesn't exist, add new recipe to recipes and send status 201
  if (!isExisting) {
    data.push(req.body);
    res.status(201).send({});
  }
});

router.put("/recipe", (req, res) => {
  let isExisting = false;
  // Iterate through our recipes data, checking for desired object
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === req.body.name) {
      isExisting = true;
      // Set desired object to request body
      data[i] = req.body;
      res.status(204).send();
      break;
    }
  }
  if (!isExisting) {
    res.status(404).send({ error: "Recipe does not exist" });
  }
});

module.exports = router;
