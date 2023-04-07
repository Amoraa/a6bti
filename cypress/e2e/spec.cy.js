describe('login / logout flow specification', () => {

  it('cannot navigate to /favourites without being logged in', () => {
    cy.visit("/favourites")
    .url().should('include', "/login");
  });

  it('rejects a login attempt by an invalid user', () => {
    cy.visit("/login")
    .get('input[name="userName"]').type("!!!")
    .get('input[name="password"]').type("123").get('.btn').click()
    .url().should('include', "/login");
  });

  it('successfully authenticates a valid github user: test-account and logs out', () => {
    cy.visit("/login")
    .get('input[name="userName"]').type("tk").get('input[name="password"]').type("123")
    .get('.btn').click()
    .url().should('include', '/favourites')
  });


});