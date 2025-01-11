import {BankKontoPage} from "../pages/BankKontoPage";

describe('account validation checks', () => {
    beforeEach(() => {
        cy.login()
        cy.getAccount()
    })


    it('checks that account data can be saved without changes', () => {
        new BankKontoPage()
            .checkAccountDataNotChanged()
    })

    it('checks that account data can be successfully changed', () => {

        cy.fixture('ibans').then((data: any) => {
            const data_values = []
            for (let el in data) {
                data_values.push(data[el])
            }

            for (let val in data_values) {
                const bic = data_values[val].bic
                const iban = data_values[val].iban
                new BankKontoPage()
                    .checkAccountDataChangedSuccessfully(iban)
            }
        })
    })
})
