describe("GoIT Homework", () => {

  it("Test Nº1", () => {
    cy.visit("https://www.edu.goit.global/account/login");
    cy.login("user888@gmail.com", "1234567890");
    cy.get('button').last().click();
    cy.contains('Log out').click();
  });

  it("Test Nº2", () => {
    cy.visit("https://www.edu.goit.global/account/login");
    cy.login("testowyqa@qa.team", "QA!automation-1");
    cy.get('button').last().click();
    cy.contains('Log out').click();
  });

});
