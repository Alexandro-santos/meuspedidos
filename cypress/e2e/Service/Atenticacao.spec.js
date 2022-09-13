import auth from '../../fixtures/auth.json'

it('[Post] - Teste de atenticação', () => {
    cy.request({
        method: 'POST',
        url: '/api/auth',
        body: auth
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.not.empty
        expect(response.body).to.have.property("jwt")

        cy.log(response.body)
    })
});

it.only('[Post] - Teste de atenticação com usuario invalido', () => {
    cy.request({
        method: 'POST',
        url: '/api/auth',
        failOnStatusCode: false,
        body: {
            "email": "alex@teste.com",
            "password": "mpe20223"
        }
    }).then((response) => {
        expect(response.status).to.eq(401)
      
        cy.log(response.body)
    })
});
