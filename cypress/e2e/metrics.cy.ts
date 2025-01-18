import {BankKontoPage} from "../pages/BankKontoPage";

describe('metrics checks', () => {

    it('runs the script', () => {
       cy.getLighthouseMetrics('einloggen')
    })
})


