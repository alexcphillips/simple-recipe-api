const request = require("supertest");
const { recipes } = require("../data");
const initialrecipesLength = recipes.length;

const app = require("../app");

describe("GET /recipes", () => {
  it("sends array of recipe names", async () => {
    const response = await request(app).get("/recipes").send().expect(200);
    const { recipeNames } = response.body;
    expect(typeof recipeNames === "array");
    expect(recipeNames.length).toBe(3);
  });
});

describe("POST /recipes", () => {
  it("given a new recipe, adds to recipes and status 201", async () => {
    const response = await request(app)
      .post("/recipes")
      .send({
        name: "butteredBagel",
        ingredients: ["1 bagel", "butter"],
        instructions: ["cut the bagel", "spread butter on bagel"]
      })
      .expect(200);

    expect(recipes.length === initialrecipesLength + 1);
  });

  it("send error response when recipe already exists", async () => {
    const response = await request(app)
      .post("/recipes")
      .send({
        name: "chai",
        ingredients: [
          "400mL water",
          "100mL milk",
          "5g chai masala",
          "2 tea bags or 20 g loose tea leaves"
        ],
        instructions: [
          "Heat water until 80 C",
          "Add milk, heat until 80 C",
          "Add tea leaves/tea bags, chai masala; mix and steep for 3-4 minutes",
          "Remove mixture from heat; strain and enjoy"
        ]
      })
      .expect(400);

    expect(recipes.length === initialrecipesLength);
  });
});
