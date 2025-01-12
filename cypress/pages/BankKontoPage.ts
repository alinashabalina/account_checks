/*
* This page - BankKontoPage - is the entry point of the bank account data testing
* This page contains a class BankKontoPage with its methods which are further called by the tests in e2e/account.cy.ts
* This page has all the checks for the page input fields or divs/spans containing the validation texts
* Some of the test data is imported from the fixtures (e.g. names) and some of it is stored in the class variables (e.g. red_note error)
* */


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
    pflichtfeld: string = 'Pflichtfeld'
    red_note: string = 'Bitte prüfe fehlende oder fehlerhafte Angaben.'
    not_valid_iban: string = 'Die IBAN ist ungültig'
    not_valid_bic: string = 'Die BIC ist ungültig'
    non_european_iban: string = 'EG800002000156789012345180002'
    non_european_error: string = 'Wir können nur auf eine europäische IBAN aus dem SEPA-Raum auszahlen.'
    iban_35: string = 'EG345678901234567890123456789012345'
    iban_german_max = 'DE893704004405320130001'
    iban_cyrillic: string = 'СY21002001950000357001234567'

    /* I was trying to add private functions with # as suggested nowadays, but it managed to
     ruin the json import (since private function with # are used in ES6 or higher)
     which ruined all the tests*/

    private clickButton() {
        cy.get(this.speichern_button).as('btn')
        cy.get('@btn').click()
    }

    private notValidIban() {
        cy.fixture('paths').then((paths: any) => {
            cy.get(paths['pflichtfeld']).should('contain.text', this.not_valid_iban)
            cy.get(paths['angaben_pruefen']).should('contain.text', this.red_note)
        })
    }

    save() {
        cy.get(this.checkbox).should('have.css', 'background-color', 'rgba(51, 102, 255, 0.08)')
            .click()
            .should('have.css', 'background-color', 'rgb(60, 48, 231)')

        this.clickButton()
    }

    /*open() {
        cy.visit('/mein-konto/bankdaten')
        return this
    }*/

    checkAccountData() {
        cy.get(this.account_button)
            .click({force: true})

        /**
         * the wait throughout all the functions is a very bad practice, and it exists
         * only because the non-visibility of loader does not guarantee visibility of prop values
         * in the inputs due to reactivity even with no throttling on
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

        this.save()

        cy.get(this.bankverbindung).should('have.text', 'Bankverbindung')
        cy.get("[data-testid='@undefined/input']")
            .then((el: JQuery<HTMLInputElement>) => {
                el[0].value === this.iban_data ? cy.log('IBAN not changed') : cy.log('IBAN changed!')
            })

        return this
    }

    checkAccountDataChangedSuccessfully(iban, bic) {
        this.checkAccountData()
        cy.get("[data-testid='@undefined/input']").eq(2).clear().type(iban)
        cy.wait(500)
        cy.fixture('paths').then((paths: any) => {
            cy.get(paths['als_bic']).should('contain.text', bic).click()
        })
        this.save()
        cy.get("[data-testid='@undefined/input']").eq(0).should('contain.value', iban)

        return this
    }

    checkAccountDataSaveWithoutIban() {
        this.checkAccountData()
        cy.get("[data-testid='@undefined/input']").eq(2).clear()

        this.save()
        cy.fixture('paths').then((paths: any) => {
            cy.get(paths['pflichtfeld']).should('contain.text', this.pflichtfeld)
            cy.get(paths['angaben_pruefen']).should('contain.text', this.red_note)
        })

        return this
    }

    checkAccountDataSaveWithMissingIbanNumber() {
        this.checkAccountData()
        cy.get("[data-testid='@undefined/input']").eq(2).type('{backspace}')
        this.save()
        this.notValidIban()

        return this
    }

    checkAccountDataSaveWithMissingBicNumber() {
        this.checkAccountData()
        cy.get("[data-testid='@undefined/input']").eq(3).type('{backspace}')
        this.save()
        cy.wait(100)
        cy.fixture('paths').then((paths: any) => {
            cy.get(paths['bic_pflichtfeld']).should('contain.text', this.not_valid_bic)
            cy.get(paths['angaben_pruefen']).should('contain.text', this.red_note)
        })

        return this
    }

    checkAccountDataSaveWithNonEuropeanIban() {
        this.checkAccountData()
        cy.get("[data-testid='@undefined/input']").eq(2).clear().type(this.non_european_iban)
        this.save()
        cy.wait(100)
        cy.fixture('paths').then((paths: any) => {
            cy.get(paths['pflichtfeld']).should('contain.text', this.non_european_error)
            cy.get(paths['angaben_pruefen']).should('contain.text', this.red_note)
        })

        return this
    }

    checkDataAfterPageRefreshWithUnsuccessfulDataSave() {
        this.checkAccountDataSaveWithNonEuropeanIban()
        cy.reload()
        cy.get("[data-testid='@undefined/input']").eq(2).should('not.have.value', this.non_european_iban)

        return this
    }

    checkDisabledNameInput() {
        this.checkAccountData()
        cy.get("[data-testid='@undefined/input']").eq(1).should('be.disabled')

        return this
    }

    checkAccountDataSaveWithoutBic() {
        this.checkAccountData()
        cy.get("[data-testid='@undefined/input']").eq(3).clear()
        this.save()
        cy.wait(100)
        cy.fixture('paths').then((paths: any) => {
            cy.get(paths['bic_pflichtfeld']).should('contain.text', this.pflichtfeld)
            cy.get(paths['angaben_pruefen']).should('contain.text', this.red_note)
        })

        return this
    }

    checkChangedAccountDataSaveWithoutConsent(iban, bic) {
        this.checkAccountData()
        cy.get("[data-testid='@undefined/input']").eq(2).clear().type(iban)
        cy.wait(500)
        cy.fixture('paths').then((paths: any) => {
            cy.get(paths['als_bic']).should('contain.text', bic).click()
            this.clickButton()
            cy.get(paths['angaben_pruefen']).should('contain.text', this.red_note)
            // it is necessary to add some checks on the checkbox but the only change is the 'background-color'
            // and it is not the most stable thing so no check added
            // the same applies to the checkNonChangedAccountDataSaveWithoutConsent() function
        })

        return this
    }


    checkNonChangedAccountDataSaveWithoutConsent() {
        this.checkAccountData()
        cy.fixture('paths').then((paths: any) => {
            this.clickButton()
            cy.get(paths['angaben_pruefen']).should('contain.text', this.red_note)
        })

        return this
    }

    checkAccountDataSaveWithoutIbanAndBic() {
        this.checkAccountData()
        cy.get("[data-testid='@undefined/input']").eq(2).clear()
        cy.get("[data-testid='@undefined/input']").eq(3).clear()
        this.save()
        cy.wait(100)
        cy.fixture('paths').then((paths: any) => {
            cy.get(paths['pflichtfeld']).should('contain.text', this.pflichtfeld)
            cy.get(paths['bic_pflichtfeld']).should('contain.text', this.pflichtfeld)
            cy.get(paths['angaben_pruefen']).should('contain.text', this.red_note)
        })

        return this
    }

    checkAccountDataSaveWithInvalidIbanAndBicSpecialCharacters() {
        // Attention! this test shows that we cannot type special characters into the IBAN input, but we can type them
        // into the BIC field which seems wrong !
        this.checkAccountData()
        cy.get("[data-testid='@undefined/input']").eq(2).type('{backspace}').type('?')
        cy.get("[data-testid='@undefined/input']").eq(3).type('{backspace}').type('!')
        this.save()
        cy.wait(100)
        cy.fixture('paths').then((paths: any) => {
            cy.get(paths['pflichtfeld']).should('contain.text', this.not_valid_iban)
            cy.get(paths['bic_pflichtfeld']).should('contain.text', this.not_valid_bic)
            cy.get(paths['angaben_pruefen']).should('contain.text', this.red_note)
        })
        cy.get("[data-testid='@undefined/input']").eq(2).should('not.contain.value', '?')
        // not checking the BIC field since it still contains the special character

        return this
    }

    checkAccountDataSaveWithInvalidIbanMax() {
        /*according to the standards the German IBAN consists of 22 characters
        whereas the global standard agrees that the IBAN may consist of up to 34 charactes
        there seems to be no SEPA available 34 character IBANs so this test will check that the iban is 'ungültig'
        in both cases
        still it seems that the input should not allow more than 34 'possibly allowed characters' for the sake of safety*/
        this.checkAccountData()
        cy.get("[data-testid='@undefined/input']").eq(2).clear().type(this.iban_german_max)
        this.save()
        cy.wait(100)
        this.notValidIban()
        cy.get("[data-testid='@undefined/input']").eq(2).clear().type(this.iban_35)
        this.notValidIban()

        return this
    }

    checkAccountDataSaveWithInvalidIbanCyrillicCharacters() {
        this.checkAccountData()
        // the iban seems ok but the first 'C' is actually Cyrillic
        cy.get("[data-testid='@undefined/input']").eq(2).type('{backspace}').type(this.iban_cyrillic)
        cy.get("[data-testid='@undefined/input']").eq(2).should('not.contain.value', 'С')

        return this
    }

}

export {BankKontoPage};