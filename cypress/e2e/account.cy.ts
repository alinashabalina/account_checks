import {BankKontoPage} from "../pages/BankKontoPage";

describe('account validation checks', () => {

    beforeEach(() => {
        cy.login()
        cy.getAccount()
        cy.getRandomIban()

    })


    it('checks that account data can be saved without changes', () => {
        new BankKontoPage()
            .checkAccountDataNotChanged()
    })

    it('checks that new account data can be successfully changed', () => {
        cy.get('@ibanVariable').then(iban => {
            cy.get('@bicVariable').then(bic => {
                new BankKontoPage()
                    .checkAccountDataChangedSuccessfully(iban, bic)

            })
        })

    })

    it('checks that account without iban will not be saved', () => {
        new BankKontoPage()
            .checkAccountDataSaveWithoutIban()
    })

    it('checks that account with missing iban number will not be saved', () => {
        new BankKontoPage()
            .checkAccountDataSaveWithMissingIbanNumber()
    })

    it('checks that account with missing iban number will not be saved', () => {
        new BankKontoPage()
            .checkAccountDataSaveWithMissingBicNumber()
    })
})
