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
