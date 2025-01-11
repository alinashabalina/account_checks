import * as paths from '../fixtures/paths.json'
import * as names from '../fixtures/names.json'

interface pathsData {
    sandwich_button: string;
    change_account_data_button: string;
    loader: string;
    bankkonto: string;
    checkbox: string;
    speichern_button: string;
    bankverbindung: string;
    als_bic: string;
}

interface namesData {
    user_name: string;
}

const paths_values: pathsData = paths
const names_values: namesData = names


class BankKontoPage {
    account_button: string = paths_values.change_account_data_button
    checkbox: string = paths_values.checkbox
    speichern_button: string = paths_values.speichern_button
    bankverbindung: string = paths_values.bankverbindung
    username: string = names_values.user_name
    iban_data: string
    als_bic: string = paths_values.als_bic


    open() {
        cy.visit('/mein-konto/bankdaten')
        return this
    }


    checkAccountData() {
        cy.get(this.account_button)
            .click({force: true})

        /**
         * this wait is a very bad practice and exists only because
         * non-visibility of loader does not guarantee visibility of prop values in the inputs
         * even with no throttling
         */

        cy.wait(300)

        cy.get("[data-testid='@undefined/input']")
            .then((el: JQuery<HTMLInputElement>) => {
                el[0].value === el[2].value.replace(/ /g, '') ? cy.log('IBAN matches') : cy.log('IBAN does not match')
                this.iban_data = el[2].value
                el[1].value === this.username ? cy.log('name matches') : cy.log('name does not match')
            })

        return this
    }

    checkAccountDataNotChanged() {

        this.checkAccountData()


        // the check based on the change of the background-color in css is not perfect
        // still there is nothing else to check yet
        cy.get(this.checkbox).should('have.css', 'background-color', 'rgba(51, 102, 255, 0.08)')
            .click()
            .should('have.css', 'background-color', 'rgb(60, 48, 231)')

        cy.get(this.speichern_button).click()

        cy.get(this.bankverbindung).should('have.text', 'Bankverbindung')
        cy.get("[data-testid='@undefined/input']")
            .then((el: JQuery<HTMLInputElement>) => {
                el[0].value === this.iban_data ? cy.log('IBAN not changed') : cy.log('IBAN changed!')
            })

        return this
    }

    checkAccountDataChangedSuccessfully(iban) {
        this.checkAccountData()
        cy.get("[data-testid='@undefined/input']")
            .then((el: JQuery<HTMLInputElement>): any => {
                el[2].innerText = ''
            })

        return this
    }

}

export {BankKontoPage};