import NotFound from "../../pages/NotFound";

describe("Test to see if our 404 page contains a 404 code for the visitor to see", () => {
  it("contains 404 errror code", () => {
    cy.mount(<NotFound />);
    cy.get("div").should("contains.text", "404");
  });
});
