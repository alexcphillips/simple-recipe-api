const express = require("express");
const { recipes } = require("../data");

const router = express.Router();

router.get("/recipes", (req, res) => {
  let recipeNames = [];

  // Push name values into recipeNames
  for (const recipe of recipes) {
    recipeNames.push(recipe.name);
  }

  res.status(200).send({ recipeNames });
});

router.get("/recipes/details/:string", (req, res) => {
  // Check if desired recipe exists
  let desiredRecipe = recipes.find((recipe) => {
    return recipe.name === req.params.string;
  });

  // If false, send empty object
  if (!desiredRecipe) {
    res.status(200).send({});
  } else {
    // Send ingredients and instructions in response with status 200
    res.status(200).send({
      ingredients: desiredRecipe.ingredients,
      instructions: desiredRecipe.instructions
    });
  }
});

router.post("/recipes", (req, res) => {
  let isExisting = false;
  // Loop through the nested objects using a for of loop
  for (const recipe of recipes) {
    if (recipe.name === req.body.name) {
      // If it exists, send an error message and status code 400 in the response
      res.status(400).send({ error: "Recipe already exists" });
      isExisting = true;
      break;
    }
  }
  // if it doesn't exist, add new recipe to recipes and send status 201
  if (!isExisting) {
    recipes.push(req.body);
    res.status(200).send({});
  }
});

router.put("/recipe", (req, res) => {
  let isExisting = false;
  // Iterate through our recipes data, checking for desired object
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].name === req.body.name) {
      isExisting = true;
      // Set desired object to request body
      recipes[i] = req.body;
      res.status(204).send();
      break;
    }
  }
  if (!isExisting) {
    res.send({ error: "Recipe does not exist" }).status(404);
  }
});

module.exports = router;
