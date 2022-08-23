/// <reference types="cypress" />

describe('US001 - Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('login')
    });
    
    it('Deve fazr login com sucesso', () => {
        cy.login('alex@teste.com', 'mpe2022')

        cy.get('[data-test="dashboard-welcome"]').should('be.visible').and('have.text', ' Bem-vindo Alexandro')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

    it('Validar mensagem de erro', () => {
        cy.login('alex@teste.com', 'mpe202')

        cy.get('[data-test="alert"]').should('have.text', 'Credenciais inválidas')
        
    });
});