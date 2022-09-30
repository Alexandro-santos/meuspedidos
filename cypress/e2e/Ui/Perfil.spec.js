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
 
describe('US001 - Funcionalidade: Perfil', () => {

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

    it('Devo adicionar experiencia e formação academica com sucesso', () => {
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

    it('Não devo criar perfil sem informar status', () => {
        cy.cadastro('semstatus' + email)

        cy.get('[data-test="dashboard-createProfile"]').click()
        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(conhecimento)
        cy.get('[data-test="profile-submit"]').click()
        cy.get(':nth-child(1) > .form-text').should('have.text', 'Nos dê uma ideia de onde você está em sua carreira')
    });

    it('Não devo criar perfil sem informar conhecimento', () => {
        cy.cadastro('semconhecimento' + email)
        cy.get('[data-test="dashboard-createProfile"]').click()

        cy.get('#mui-component-select-status').click()
        cy.get('.MuiMenu-list li')

            .then(($li) => {

            const items = $li.toArray()

            return Cypress._.sample(items)

        }).click()
        cy.get('[data-test="profile-submit"]').click()
        cy.get('.MuiFormHelperText-root').should('have.text', 'Conhecimentos é obrigatório')
    });
    
});

describe('US002 - Funcionalidade: Visualização de perfil', () => {
    beforeEach(() => {
        cy.visit('perfis')
    });

    it('Validar primeiro item da lista', () => {
        cy.get('[data-test="profile-name"]').first().should('have.text', 'Pedro Guerra')
    });


    it('Validar terceiro item da lista', () => {
        cy.get('[data-test="profile-name"]').eq(2).should('have.text', 'Pa Sun')
    });

    it('Validar ultimo item da lista', () => {
        cy.get('[data-test="profile-name"]').last().should('have.text', 'Roberto dos Santos Filho')
    });


});

describe('US003 - Funcionalidade: Visualização da página de perfil com App Action', () => {
    beforeEach(() => {
        cy.visit('perfis')
        cy.intercept({
            method: 'GET',
            url: 'api/profile'
        },{
            statusCode: 200,
            fixture: "profile"
        })
        cy.reload()
    });
    
    it('Validar primeiro item da lista com App Action', () => {
        cy.get('[data-test="profile-name"]').first().should('have.text', 'Alexandro Lima')
    });

    it('Validar terceiro item da lista', () => {
        cy.get('[data-test="profile-name"]').eq(2).should('have.text', 'Mariana Peixoto')
    });

    it('Validar ultimo item da lista', () => {
        cy.get('[data-test="profile-name"]').last().should('have.text', 'Fernando Garcia')
    });

    it('Validar página de perfil vazia', () => {
        cy.intercept('api/profile', {statusCode: 404})
        cy.reload()
        cy.get('[data-test="profiles-noProfiles"]').should('be.visible')
        .and('have.text', 'Nenhum perfil encontrado')
    });


});
