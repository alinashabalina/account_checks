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
})
