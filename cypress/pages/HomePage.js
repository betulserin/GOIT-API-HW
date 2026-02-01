export class HomePage {
  logout() {
    cy.get('button').last().click();
    cy.contains('Log out').click();
  }
}