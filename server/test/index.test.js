const request = require("supertest");
const { data } = require("../data");
const initialDataLength = data.length;

const app = require("../app");

describe("GET /recipes", () => {
  it("sends array of recipe names", async () => {
    const response = await request(app).get("/recipes").send().expect(200);
    const { recipeNames } = response.body;
    expect(typeof recipeNames === "array");
    expect(recipeNames.length).toBe(3);
  });
});

describe("GET /recipes/details/:string", () => {
  it("sends details of desired recipe", async () => {
    const response = await request(app)
      .get("/recipes/details/chai")
      .send()
      .expect(200);
    const { ingredients, instructions } = response.body;
    expect(ingredients.length).toBe(4);
    expect(instructions.length).toBe(4);
  });

  it("send empty object if not found, with status code 200", async () => {
    const response = await request(app)
      .get("/recipes/details/ABSENT_RECIPE")
      .send()
      .expect(200);

    expect(typeof response.body === "object");
    expect(!response.body.length);
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
      .expect(201);

    expect(data.length === initialDataLength + 1);
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

    expect(data.length === initialDataLength);
  });
});

describe("PUT /recipes", () => {
  it("updates recipe", async () => {
    const preUpdateBagel = data.find((recipe) => {
      return recipe.name === "butteredBagel";
    });

    const response = await request(app)
      .put("/recipe")
      .send({
        name: "butteredBagel",
        ingredients: ["1 bagel", "2 tbsp butter"],
        instructions: ["cut the bagel", "spread butter on bagel"]
      })
      .expect(204);

    expect(typeof response.body === "object");
    expect(!response.body.length);
  });

  it("if absent recipe, sends error and status code 404", async () => {
    const response = await request(app)
      .put("/recipe")
      .send({
        name: "ABSENT_RECIPE"
      })
      .expect(404);
  });
});
