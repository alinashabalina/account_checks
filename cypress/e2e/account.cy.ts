import {BankKontoPage} from "../pages/BankKontoPage";

describe('account validation checks', () => {
  beforeEach(() => {
    cy.login()
    cy.getAccount()
  })
  it('checks if we can click the button to change the data', () => {
    new BankKontoPage()
        //.checkAccountDataNotChanged()
        .checkAccountDataChangedSuccessfully()
  })

})