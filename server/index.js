const express = require("express");
const app = express();
app.use(express.json());
let { recipes } = require("./data.json");

app.get("/recipes", (req, res) => {
  let result = {
    recipeNames: []
  };

  for (let i = 0; i < recipes.length; i++) {
    result.recipeNames.push(recipes[i].name);
  }

  res.send(result).status(200);
});

app.listen(3000, () => {
  console.log("Connected to server SUCCESSFULLY");
});
