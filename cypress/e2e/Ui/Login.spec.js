/// <reference types="cypress" />
import usuarios from "../../fixtures/usuarios.json";

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

    it('Deve fazer login com sucesso com importação', () => {
        cy.login(usuarios[0].email, usuarios[0].senha)

        cy.get('[data-test="dashboard-welcome"]').should('be.visible').and('have.text', ' Bem-vindo Alexandro')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
    });

    it.only('Deve fazer login com sucesso usando Fixture', () => {
        cy.fixture("usuarios").then((user) => {
            cy.login(usuarios[0].email, usuarios[0].senha)
        })

        cy.get('[data-test="dashboard-welcome"]').should('be.visible').and('have.text', ' Bem-vindo Alexandro')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Bem-vindo')
        
    });
});