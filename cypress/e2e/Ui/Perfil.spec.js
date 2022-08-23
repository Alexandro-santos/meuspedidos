/// <reference types="cypress" />
const dados_faker = require('faker-br')
const nome = dados_faker.name.firstName()
const git_user = dados_faker.internet.email()
const biografia = dados_faker.lorem.paragraph()
const email = dados_faker.internet.email()
const empresa = dados_faker.company.companyName()
const local = dados_faker.address.city()

var cidades = ['Rio Branco, AC', 'Maceió, AL', 'Macapá,AP', 'Manaus, AM', 'Salvador, BA', 'Fortaleza, CE',
'Brasília, DF', 'Vitória, ES', 'Goiânia, GO', 'São Luís, MA', 'Cuiabá, MT', 'Campo Grande, MS',
'Belo Horizonte, MG', 'Belém, PA', 'João Pessoa, PB', 'Curitiba, PR', 'Recife, PE', 'Teresina, PI',
'Rio de Janeiro, RJ', 'Natal, RN', 'Porto Alegre, RS', 'Porto Velho, RO', 'Boa Vista, RR',
'Florianópolis, SC', 'São Paulo, SP', 'Aracaju, SE', 'Palmas, TO']

const cidade = Cypress._.sample(cidades)

var conhecimentos = ['Testes de Integração, Automação de Testes', 'Cypress, Testes Manuais', 
'Testes de Integração, Automação de Testes, Cypress', 'Testes Manuais, Testes de Integração, Automação de Testes']

const conhecimento = Cypress._.sample(conhecimentos)

describe('US003 - Funcionalidade: Perfil', () => {

    beforeEach(() => {
        cy.visit('cadastrar')
    });

    it('Devo criar perfil com sucesso', () => {
        cy.cadastro(email)

        cy.perfil(cidade, conhecimento, git_user, biografia, nome)

        cy.get('[data-test="dashboard-welcome"]').should('have.text', ' Bem-vindo Alex')
        cy.get('.container > :nth-child(6)').should('have.text','Formações Acadêmicas')

        cy.get('[data-test="dashboard-deleteProfile"]').click()

        cy.get('.lead').should('have.text', ' Acessar Conta')
    });

    it('Devo adicionar experiencia com sucesso', () => {
        cy.cadastro(email)

        cy.perfil(cidade, conhecimento, git_user, biografia, nome)

        cy.experiencia(cidade, empresa)

        cy.get('.container > :nth-child(5)').should('not.be.empty')

        cy.get('[data-test="dashboard-deleteProfile"]').click()

        cy.get('.lead').should('have.text', ' Acessar Conta')
    });

    it('Devo adicionar formção academica com sucesso', () => {
        cy.cadastro(email)

        cy.perfil(cidade, conhecimento, git_user, biografia, nome)

        cy.formacao(local, conhecimento)

        cy.get('.container > :nth-child(7)').should('not.be.empty')
        cy.get('.container > :nth-child(7)').should('be.visible')

        cy.get('[data-test="dashboard-deleteProfile"]').click()

        cy.get('.lead').should('have.text', ' Acessar Conta')
    });

    it('Devo experiencia e formação academica com sucesso', () => {
        cy.cadastro(email)

        cy.perfil(cidade, conhecimento, git_user, biografia, nome)
        cy.experiencia(cidade, empresa)
        cy.formacao(local, conhecimento)

        cy.get('.container > :nth-child(5)').should('not.be.empty')
        cy.get('.container > :nth-child(5)').should('be.visible')
        cy.get('.container > :nth-child(7)').should('not.be.empty')
        cy.get('.container > :nth-child(7)').should('be.visible')

        cy.get('[data-test="dashboard-deleteProfile"]').click()

        cy.get('.lead').should('have.text', ' Acessar Conta')
        
    });
    
});