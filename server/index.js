const express = require("express");
const app = express();
app.use(express.json());
let { recipes } = require("./data.json");

app.get("/recipes", (req, res) => {
  let recipeNames = [];

  // Push name values into recipeNames
  for (let i = 0; i < recipes.length; i++) {
    result.recipeNames.push(recipes[i].name);
  }

  // Send names
  res.send({ recipeNames }).status(200);
});

app.get("/recipes/details/:string", (req, res) => {
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

app.listen(3000, () => {
  console.log("Connected to server SUCCESSFULLY");
});
