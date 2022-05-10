import mockResponse from "../fixtures/mockResponse.json";
beforeEach(() => {
  cy.visit("/");
});
it("Should show the title", () => {
  cy.get("h1").contains("Welcome to Pixelchains Shop");
});

it("Should show There was an error processing your request where API returns 500", () => {
  cy.intercept(
    "GET",
    "https://api.opensea.io/api/v1/assets?collection=pixelchain&order_direction=desc&limit=20&include_orders=false",
    {
      statusCode: 500,
    }
  );
  cy.get(".chakra-alert").contains(
    "There was an error processing your request"
  );
});

it("Should show nft's cards when response is 200", () => {
  cy.intercept(
    {
      method: "GET",
      url: "https://api.opensea.io/api/v1/assets?collection=pixelchain&order_direction=desc&limit=20&include_orders=false*", // that have a URL that matches '/users/*'
    },
    mockResponse
  ).as("getAssets");
  cy.wait("@getAssets").then(() => {
    cy.get('[data-cy="data-grid"]').should("exist");
  });
});
