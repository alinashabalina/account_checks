/*
* This page - UserAccountPage - is the entry point of navigating through the personal area
* This page contains a class PersonalAreaPage with its methods which are further called by the tests in e2e/account.cy.ts
* This page stores methods which (for now) only lead the user to his bank account data
* */


class PersonalAreaPage {

    navigateToBankAccountData() {
        cy.getAccount()
        return this
    }

}

export {PersonalAreaPage};