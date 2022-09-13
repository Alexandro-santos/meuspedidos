describe('Teste de criação de postagens', () => {
    let token
    beforeEach(() => {
        cy.atenticacao().then((auth) => {
            token = auth
        })
    });
    
    it('Criar uma postagem', () => {
        

        cy.request({
            method: 'POST',
            url: '/api/posts',
            headers:{
                accept: 'application/json',
                Cookie: token,
                ContentType: "application/json"
            },
            body:{
                "text": "Postagem pelo swagger"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.not.empty
            expect(response.body.text).to.eq("Postagem pelo swagger")
        })
    });
});

describe('Teste consulta', () => {
    let token
    beforeEach(() => {
        cy.atenticacao().then((auth) => {
            token = auth
        })
    });

    it('Consultar postagens', () => {
        

        cy.request({
            method: 'GET',
            url: '/api/posts',
            headers:{
                accept: 'application/json',
                Cookie: token,
                ContentType: "application/json"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.empty
        })
    });

    it('Consutar postagem por id', () => {
        
        cy.criarPostagem(token, "Boot camp").then((response) =>{
            let id = response.body._id

            cy.request({
                method: 'GET',
                url: `/api/posts/${id}`,
                headers:{
                    accept: 'application/json',
                    Cookie: token,
                    ContentType: "application/json"
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.not.empty
            })
        })
    });
});

describe('Testes de exluir posts', () => {
    let token
    beforeEach(() => {
        cy.atenticacao().then((auth) => {
            token = auth
        })
    });
    it('Excluir um post', () => {
        cy.criarPostagem(token, "Excluindo um post").then((response) =>{
            let id = response.body._id

            cy.request({
                method: 'DELETE',
                url: `/api/posts/${id}`,
                headers:{
                    accept: 'application/json',
                    Cookie: token,
                    ContentType: "application/json"
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.not.empty
            })
        })
    });
});

describe('Teste curtir um post', () => {
    let token
    beforeEach(() => {
        cy.atenticacao().then((auth) => {
            token = auth
        })
    });
    
    it('[PUT] Dar Like num post', () => {
        cy.criarPostagem(token, "Excluindo um post").then((response) =>{
            let id = response.body._id

            cy.request({
                method: 'PUT',
                url: `/api/posts/like/${id}`,
                headers:{
                    accept: 'application/json',
                    Cookie: token,
                    ContentType: "application/json"
                }
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.not.empty
            })
        })
    });

    it('[PUT] Dar Deslike num post', () => {
        cy.criarPostagem(token, "Excluindo um post").then((response) =>{
            let id = response.body._id

            cy.request({
                method: 'PUT',
                url: `/api/posts/unlike/${id}`,
                failOnStatusCode: false,
                headers:{
                    accept: 'application/json',
                    Cookie: token,
                    ContentType: "application/json"
                }
            }).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.not.empty
            })
        })
    });

    it('Descurtindo um post', () => {
        cy.criarPostagem(token, "Excluindo um post").then((response) =>{
            let id = response.body._id

            cy.curtirPost(token, id)
            cy.descurtirPost(token, id).then((response) => {
                expect(response.status).to.eq(200)
            })
            
        })
    });
});


