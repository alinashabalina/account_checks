import * as paths from '../fixtures/paths.json'


interface pathsData {
    sandwich_button: string;
    change_account_data_button: string;
    loader: string;
    bankkonto: string;
    checkbox: string;
    speichern_button: string;
}

const data_values:pathsData = paths

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

    input_iban = cy.get("[data-testid='@undefined/input']").first()
    input_bic = cy.get("[data-testid='@undefined/input']").last()
    account_button:string = data_values.change_account_data_button
    checkbox:string = data_values.checkbox
    speichern_button:string = data_values.speichern_button

    open() {
        cy.visit('/mein-konto/bankdaten')
        return this
    }

    checkIBAN() {
        return this
    }

    clickChangeData() {
        cy.get(this.account_button)
            .should('have.text', 'Bankkonto ändern')
            .click()
        cy.wait(300)
        this.input_iban.should('have.value', 'AT026000000001349870')
        this.input_bic.should('have.value', 'INGDDEFFXXX')

        cy.get(this.checkbox).should('have.css', 'background-color', 'rgba(51, 102, 255, 0.08)')
            .click()
            .should('have.css', 'background-color', 'rgb(60, 48, 231)')

        cy.get(this.speichern_button).click()
        return this
    }

    changeSuccessful() {
        cy.fixture('ibans').then((data: ibanData) => {
        })
        return this
    }
}

export { BankKontoPage };