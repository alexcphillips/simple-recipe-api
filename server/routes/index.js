const express = require("express");
const recipes = require("./routes");
const router = express.Router();

router.get("/recipes", recipes.findAll);
router.get("/recipes/details/:string", recipes.findDetails);
router.post("/recipes", recipes.addOne);

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
