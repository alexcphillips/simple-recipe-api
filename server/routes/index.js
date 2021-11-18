const express = require("express");
const { recipes } = require("../data.json");

const router = express.Router();

router.get("/recipes", (req, res) => {
  let recipeNames = [];

  // Push name values into recipeNames
  for (let i = 0; i < recipes.length; i++) {
    result.recipeNames.push(recipes[i].name);
  }

  // Send names
  res.send({ recipeNames }).status(200);
});

router.get("/recipes/details/:string", (req, res) => {
  // Check if desired recipe exists
  let desiredRecipe = recipes.find((recipe) => {
    return recipe.name === req.params.string;
  });

  // If false, send empty object
  if (!desiredRecipe) {
    res.send({}).status(200);
  } else {
    // Send ingredients and instructions in response with status 200
    res
      .send({
        ingredients: desiredRecipe.ingredients,
        instructions: desiredRecipe.instructions
      })
      .status(200);
  }
});

router.post("/recipes", (req, res) => {
  console.log(recipes);
  // Loop through the nested objects using a for of loop
  for (let recipe in recipes) {
    if (recipe.name === req.body.name) {
      // If it exists, send an error message and status code 400 in the response
      res.send({ error: "Recipe already exists" }).status(400);
      break;
    }
  }
  // If the above loop didn't find a match, we know this is a new recipe. Add new recipe to recipes and send status 201
  recipes.push(req.body);
  res.send({}).status(201);
});

router.put("/recipe", (req, res) => {
  let isExisting = false;
  // Iterate through our recipes data, checking for desired object
  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].name === req.body.name) {
      isExisting = true;
      // Set desired object to request body
      recipes[i] = req.body;
      res.send().status(204);
      break;
    }
  }
  if (!isExisting) {
    res.send({ error: "Recipe does not exist" }).status(404);
  }
});

module.exports = router;
