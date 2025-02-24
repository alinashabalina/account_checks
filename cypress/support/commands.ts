/*
* This section - commands - is where all custom cypress commands are stored and later used on pages and in the tests
* */


import {Interception} from "cypress/types/net-stubbing";

const email: string = Cypress.env("email")
const password: string = Cypress.env("password")

type UserRes = {}

interface namesData {
    user_name: string;
}

interface pathsData {
    sandwich_button: string;
    "change_account_data_button": string;
}


Cypress.Commands.add('login', (): void => {
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

    // the line below should contain extra checks on button not being disabled but the state does not allow it now
    // there is no explicit attribute disabled added
    cy.get("[data-testid='login']").click()

    cy.wait('@dashboard').then(({response}: Interception<UserRes>) => {
        cy.fixture('names').then((data: namesData) => {
            const user_name: string = data.user_name
            const full_name:string = response.body.data.profile?.self?.first_name + ' ' + response.body.data.profile?.self?.last_name
            full_name === user_name ? cy.log('successful login') : cy.log('unsuccessful login')
        })
    })
})


Cypress.Commands.add('getAccount', (): void => {
    cy.fixture('paths').then((data: pathsData) => {
        const sandwich_button: string = data.sandwich_button

        cy.get(sandwich_button).click()
        cy.get("[data-testid='account']").should('be.visible').click()
        cy.get("[data-testid='bank_account']").should('have.text', 'Bankverbindung').click()
    })
})

Cypress.Commands.add('getRandomIban', (): void => {
    const data_values = []
    cy.fixture('ibans').then((data: any) => {
        for (let el in data) {
            data_values.push(data[el])
        }

        const keys = Object.keys(data_values);
        const len:number = keys.length
        const rnd:number = Math.floor(Math.random() * len);
        const key = data_values[keys[rnd]];

        const bic = key.bic
        const iban = key.iban
        cy.wrap(bic).as("bicVariable")
        cy.wrap(iban).as("ibanVariable")
    });
})


Cypress.Commands.add('getLighthouseMetrics', (endpoint:string): JSON => {
    function arr(start, finish): number[] {return Array.from({length: finish - start + 1}, (_, a) => a + start)}
    const refs: any = {"min": arr(0, 49),
    "mid": arr(50, 89),
    "up": arr(90, 100)}
    let data_res
    cy.exec(`lighthouse ${'https://alpha-app.master-z.de/' + endpoint} --output=json`).then((result) => {
        data_res = JSON.parse(result.stdout)
    })
    return data_res
})


