import "./commands"


export {}
declare global {
    namespace Cypress {
        interface Chainable {
            login(): Chainable<void>;
            getAccount(): Chainable<void>;
            getRandomIban(): any;
            getAPath():Chainable<string>;
            getLighthouseMetrics(endpoint: string): JSON;
            exec(): any
        }
    }
}
