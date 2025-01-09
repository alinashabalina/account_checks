interface pathsData {
    sandwich_button: string;
    change_account_data_button: string;
}

interface DE {
    CMCIDEDD: string
}

interface OEST {
    RZOOAT2L: string
}

interface SCHW {
    VABECH22: string
}

interface ibanData {
    DE: DE;
    OEST: OEST;
    SCHW: SCHW;
}

class BankKontoPage {
    IBAN_NEW: string = Cypress.env("IBAN_NEW")
    input_iban = cy.get("[data-testid='@undefined/input']").first()
    input_bic = cy.get("[data-testid='@undefined/input']").last()

    open() {
        cy.visit('/mein-konto/bankdaten')
        return this
    }

    checkIBAN() {
        this.input_iban.should('have.value', this.IBAN_NEW)
        return this
    }

    clickChangeData() {
        cy.fixture('paths').then((data: pathsData) => {
            const account_button:string = data.change_account_data_button
            cy.get(account_button).should('have.text', 'Bankkonto ändern').click()
            this.input_iban.should('not.be.disabled')
            this.input_bic.should('not.be.disabled')
        })
        return this
    }

    changeSuccessful() {
        cy.fixture('ibans').then((data: ibanData) => {
        this.input_iban.should('have.value', this.IBAN_NEW)
        })
        return this
    }
}

export { BankKontoPage };