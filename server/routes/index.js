const express = require("express");
const recipes = require("./routes");
const router = express.Router();

router.get("/recipes", recipes.findAll);
router.get("/recipes/details/:string", recipes.findDetails);
router.post("/recipes", recipes.addOne);
router.put("/recipe", recipes.updateOne);

module.exports = router;
