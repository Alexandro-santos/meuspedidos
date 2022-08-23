/// <reference types="cypress" />
const dados_faker = require('faker-br')
const email = dados_faker.internet.email()

describe('US002 Funcionalidade: Cadastro', () => {
    beforeEach(() => {
        cy.visit('cadastrar')
    });

    it('Deve fazer cadastro com sucesso', () => {
        cy.cadastro(email)

        cy.get('.large').should('be.visible').and('have.text', 'Dashboard')
       
        
    });
});