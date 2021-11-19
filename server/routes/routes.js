const { data } = require("../data");

exports.findAll = (req, res) => {
  let recipeNames = [];

  // Push name values into recipeNames
  console.log(data);
  for (const recipe of data) {
    recipeNames.push(recipe.name);
  }

  return res.status(200).send({ recipeNames });
};

exports.findDetails = (req, res) => {
  // Check if desired recipe exists
  let desiredRecipe = data.find((recipe) => {
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
};

exports.addOne = (req, res) => {
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
    return res.status(201).send({});
  }
};
