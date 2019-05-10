// https://docs.cypress.io/api/introduction/api.html

describe('Listagem de issue', () => {
  it('Verifica se a página foi renderizada', () => {
    cy.visit('/');
    cy.get('button.success')
      .should('have.length', 1);
  });

  it('Verifica filtro do grid', () => {
    cy.visit('/');
    cy.get('input')
      .type('Busca por conteúdo não encontrado');
    cy.get('table tr').should('have.length', 3);
  });
});
