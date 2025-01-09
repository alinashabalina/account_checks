interface pathsData {
    sandwich_button: string;
    "change_account_data_button": string;
}

class BankKontoPage {
    IBAN: string = Cypress.env("IBAN")
    input = cy.get("[data-testid='@undefined/input']")

    open() {
        cy.visit('/mein-konto/bankdaten')
        return this
    }

    checkIBAN() {
        this.input.should('have.value', this.IBAN)
        return this
    }

    clickChangeData() {
        cy.fixture('paths').then((data: pathsData) => {
            const account_button:string = data.change_account_data_button
            cy.get(account_button).should('have.text', 'Bankkonto ändern').click()
            this.input.should('not.be.disabled')
        })
        return this
    }
}

export { BankKontoPage };