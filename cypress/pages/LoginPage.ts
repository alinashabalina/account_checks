class LoginPage {

    open() {
        cy.visit('/einloggen')
        return this
    }

    login() {
        this.open()
        cy.login()
    }

}

export {LoginPage};