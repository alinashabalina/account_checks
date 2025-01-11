The following repo is a combination of Cypress tests written with TypeScript for Zasta GmbH

To test the change of the bank account clone the repo and:

run **npm install** in the root folder to install all the dependencies
to test the functionality without Testrail report run **npm run cy:open**
to test the functionality and send a Testrail report **run npm run cy:testrail**

All the tests in the cypress/e2e/account.cy.ts are marked with corresponding testcases from Testrail.
If a test fails in the report mode (**run npm run cy:testrail**), it will be seen on the page https://zastatrial.testrail.io/index.php?/runs/view/1
If a test fails in the run mode (**npm run cy:open**), it will not be marked on the page as 'failed'

The tests use test IBAN data stored in cypress/fixtures/ibans.json taken from https://ibanvalidieren.de/beispiele.html


Repo structure:

cypress/e2e/something.cy.ts - all the existing tests

cypress/fixtures/something.json - test data stored in the repo and acquired in the tests via cy.fixture() command

cypress/pages/SomePage.ts - page object model storing all selectors and functions for a certain page in the application

cypress/plugins/index.ts - plugins used with Cypress (e.g. Testrail)

cypress/support/index.ts - types for commands

cypress/support/commands.ts - custom cypress commands used in the tests (e.g. cy.login())

cypress.env.json contains sensitive data such as credentials and Testrail settings => added to .gitignore 