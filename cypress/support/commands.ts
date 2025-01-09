import {Interception} from "cypress/types/net-stubbing";

const email: string = Cypress.env("email")
const password: string = Cypress.env("password")
const IBAN: string = Cypress.env("IBAN")

type UserRes = {}
interface namesData {
    user_name: string;
}
interface pathsData {
    sandwich_button: string;
    "change_account_data_button": string;
}


Cypress.Commands.add('login', (): void => {
    cy.visit("https://alpha-app.master-z.de/")
    cy.setCookie('CookieConsent', 'true')
    cy.get("[data-testid='@email/input']").type(email)
    cy.get("[data-testid='@password/input']").type(password)

    cy.intercept('POST', '/graphql', req => {
        if (req.body.operationName === 'dashboard') {
            req.alias = 'dashboard';
        } else if (req.body.operationName === 'SmartlookFeatureEnabledQuery') {
            req.alias = 'SmartlookFeatureEnabledQuery';
        } else if (req.body.operationName === 'supportChannels') {
            req.alias = 'supportChannels';
        }
    })

    // the line below should contain extra checks on button not being disabled
    cy.get("[data-testid='login']").click()

    cy.wait('@dashboard').then(({response}: Interception<UserRes>) => {
        cy.fixture('names').then((data: namesData) => {
            const user_name: string = data.user_name
            response.body.data.profile?.self?.first_name === user_name ? cy.log('successful login') : cy.log('unsuccessful login')
        })
    })

})


Cypress.Commands.add('getAccount', (): void => {
    cy.fixture('paths').then((data: pathsData) => {
        const sandwich_button:string = data.sandwich_button
        const account_button:string = data.change_account_data_button

        cy.get(sandwich_button).click()
        cy.get("[data-testid='account']").should('be.visible').click()
        cy.get("[data-testid='bank_account']").should('have.text', 'Bankverbindung').click()
        cy.get("[data-testid='@undefined/input']").should('have.value', IBAN)
        cy.get(account_button).should('have.text', 'Bankkonto ändern').click()
    })


})