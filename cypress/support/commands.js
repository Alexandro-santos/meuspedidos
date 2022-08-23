// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/// <reference types="Cypress" />

Cypress.Commands.add('navigate', (route) => {
    cy.intercept(route).as('loadpage')
    cy.visit(route, { timeout: 30000 })
    cy.wait('@loadpage')
})

Cypress.Commands.add("login", (email, password) => { 
    cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
        cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password)
        cy.get('[data-test="login-submit"]').click()
 })

 Cypress.Commands.add("cadastro", (email) => { 
    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type('Alex')
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('mpe2020')
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('mpe2020')
        cy.get('[data-test="register-submit"]').click()
 })

 Cypress.Commands.add("perfil", (cidade, conhecimento, git_user, biografia, nome) => { 
    cy.get('[data-test="dashboard-createProfile"]').click()
        cy.get('#mui-component-select-status').click()
        cy.get('.MuiMenu-list li')

            .then(($li) => {

            const items = $li.toArray()

            return Cypress._.sample(items)

        }).click()

        cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input').type('VIA')
        cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input').type('https://viavarejo.com/')
        cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input').type(cidade)
        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(conhecimento)
        cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input').type(git_user)
        cy.get('[data-test="profile-bio"] > .MuiInputBase-root').type(biografia)
        cy.get('[data-test="profile-socials"]').click()
        cy.get('[data-test="profile-twitter"] > .MuiInputBase-root > .MuiInputBase-input').type('https://twitter.com/' + nome)
        cy.get('[data-test="profile-facebook"] > .MuiInputBase-root > .MuiInputBase-input').type('https://facebook.com/' + nome)
        cy.get('[data-test="profile-youtube"] > .MuiInputBase-root > .MuiInputBase-input').type('https://youtube.com/' + nome)
        cy.get('[data-test="profile-linkedin"] > .MuiInputBase-root > .MuiInputBase-input').type('https://linkedin.com/' + nome)
        cy.get('[data-test="profile-instagram"] > .MuiInputBase-root > .MuiInputBase-input').type('https://instagram.com/' + nome)
        cy.get('[data-test="profile-medium"] > .MuiInputBase-root > .MuiInputBase-input').type('https://medium.com/' + nome)
        cy.get('[data-test="profile-submit"]').click()
 })

 Cypress.Commands.add("experiencia", (empresa, cidade) => { 
    cy.get('[data-test="dashboard-addExperience"]').click()
        cy.get('[data-test="experience-title"] > .MuiInputBase-root > .MuiInputBase-input').type('QA Junior')
        cy.get('[data-test="experience-company"] > .MuiInputBase-root > .MuiInputBase-input').type(empresa)
        cy.get('[data-test="experience-location"] > .MuiInputBase-root > .MuiInputBase-input').type(cidade)
        cy.get('[data-test="experience-from"] > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
        cy.get(':nth-child(1) > :nth-child(2) > .MuiButtonBase-root > .MuiIconButton-label').click()
        cy.get('[data-test="experience-to"] > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
        cy.get(':nth-child(4) > :nth-child(7) > .MuiButtonBase-root > .MuiIconButton-label > .MuiTypography-root').click()
        cy.get('[data-test="experience-description"] > .MuiInputBase-root').type('Sitemas de Informação')
        cy.get('[data-test="experience-submit"]').click()
 })

 Cypress.Commands.add("formacao", (local, conhecimento) => { 
    cy.get('[href="/adicionar-formacao"]').click()
    cy.get('[data-test="education-school"] > .MuiInputBase-root > .MuiInputBase-input').type('Universidade de ' + local )
    cy.get('[data-test="education-degree"] > .MuiInputBase-root > .MuiInputBase-input').type('Bacharelado')
    cy.get('[data-test="education-fieldOfStudy"] > .MuiInputBase-root > .MuiInputBase-input').type('Sistemas de Informação')
    cy.get('[data-test="education-from"] > .MuiInputBase-root > .MuiInputAdornment-root > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click()
    cy.get(':nth-child(1) > :nth-child(2) > .MuiButtonBase-root > .MuiIconButton-label').click()
    cy.get('[name="current"]').check()
    cy.get('[data-test="education-description"] > .MuiInputBase-root').type(conhecimento)
    cy.get('[data-test="education-submit"]').click()
 })
