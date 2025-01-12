/*
* This page - LoginPage - is the entry point of the login input fields testing
* This page contains a class LoginPage with its methods which are further called by the tests in e2e/account.cy.ts
* This page stores methods which log the user in although the checks for input validation are not implemented yet
* */


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