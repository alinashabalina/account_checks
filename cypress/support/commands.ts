Cypress.Commands.add('login', (email:string, password:string):void => {
    cy.visit("https://alpha-app.master-z.de/mein-konto/bankdaten-pruefen")
    const input = cy.get("[data-testid='@undefined/input']")
})
