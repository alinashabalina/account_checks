/*
* This test suite is based on the testcases stored in Testrail https://zastatrial.testrail.io/
* The tests call the methods stored in the BankKontoPage where all the checks happen
* */


import {BankKontoPage} from "../pages/BankKontoPage";
import {LoginPage} from "../pages/LoginPage";
import {PersonalAreaPage} from "../pages/UserAccount";

describe('account validation checks', () => {

    beforeEach(() => {
        new LoginPage()
            .login()
        new PersonalAreaPage()
            .navigateToBankAccountData()
        cy.getRandomIban()

    })

    it('C1: checks that new account data can be successfully changed', {
        // this test is flaky even with the cy.wait() in it
        retries: {
            runMode: 2, openMode: 2,
        },
    }, () => {
        cy.get('@ibanVariable').then(iban => {
            cy.get('@bicVariable').then(bic => {
                new BankKontoPage()
                    .checkAccountDataChangedSuccessfully(iban, bic)

            })
        })

    })

    it('C2: checks that account data can be saved without changes', () => {
        new BankKontoPage()
            .checkAccountDataNotChanged()
    })


    it('C3: checks that account without iban will not be saved', () => {
        new BankKontoPage()
            .checkAccountDataSaveWithoutIban()
    })

    it('C4: checks that account with missing iban digit will not be saved', () => {
        new BankKontoPage()
            .checkAccountDataSaveWithMissingIbanNumber()
    })

    it('C5: checks that account with missing bic char will not be saved', () => {
        new BankKontoPage()
            .checkAccountDataSaveWithMissingBicNumber()
    })

    it('C6: checks that account with non-european IBAN will not be saved', () => {
        new BankKontoPage()
            .checkAccountDataSaveWithNonEuropeanIban()
    })

    it('C7: checks that unsuccessful data will not be stored in the input after page reload', () => {
        new BankKontoPage()
            .checkDataAfterPageRefreshWithUnsuccessfulDataSave()
    })

    it('C8: checks that name cannot be changed on the bank account page', () => {
        new BankKontoPage()
            .checkDisabledNameInput()
    })

    it('C9: checks that account without bic will not be saved', () => {
        new BankKontoPage()
            .checkAccountDataSaveWithoutBic()
    })

    it('C10: checks that changed account without checkbox consent will not be saved', () => {
        cy.get('@ibanVariable').then(iban => {
            cy.get('@bicVariable').then(bic => {
                new BankKontoPage()
                    .checkChangedAccountDataSaveWithoutConsent(iban, bic)
            })
        })

    })

    it('C11: checks that non-changed account without checkbox consent will not be saved', () => {
        new BankKontoPage()
            .checkNonChangedAccountDataSaveWithoutConsent()
    })

    it('C12: checks that account without IBAN AND BIC will not be saved', () => {
        new BankKontoPage()
            .checkAccountDataSaveWithoutIbanAndBic()
    })

    it('C13: checks that account with IBAN AND BIC ans special characters will not be saved', () => {
        new BankKontoPage()
            .checkAccountDataSaveWithInvalidIbanAndBicSpecialCharacters()
    })

    it('C14: checks that account with invalid length IBAN will not be saved', () => {
        new BankKontoPage()
            .checkAccountDataSaveWithInvalidIbanMax()
    })

    it('C15: checks IBAN does not accept Cyrillic characters', () => {
        new BankKontoPage()
            .checkAccountDataSaveWithInvalidIbanCyrillicCharacters()
    })
})


