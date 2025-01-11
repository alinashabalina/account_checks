import {BankKontoPage} from "../pages/BankKontoPage";

describe('account validation checks', () => {

    beforeEach(() => {
        cy.login()
        cy.getAccount()
        cy.getRandomIban()

    })

    it('C1: checks that new account data can be successfully changed', () => {
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

    it('C5: checks that account with missing bic number will not be saved', () => {
        new BankKontoPage()
            .checkAccountDataSaveWithMissingBicNumber()
    })
})
