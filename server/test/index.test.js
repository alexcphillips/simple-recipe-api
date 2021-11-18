const request = require("supertest");
const { recipes } = require("../data");
const initialrecipesLength = recipes.length;

const app = require("../app");

describe("POST /recipes", () => {
  it("given a new recipe, adds to recipes and status 201", async () => {
    const response = await request(app)
      .post("/recipes")
      .send({
        name: "butteredBagel",
        ingredients: ["1 bagel", "butter"],
        instructions: ["cut the bagel", "spread butter on bagel"]
      });

    expect(recipes.length === initialrecipesLength + 1);
    expect(response.statusCode).toBe(200);
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
      });

    expect(recipes.length === initialrecipesLength);
    expect(response.statusCode).toBe(400);
  });
});
