import {defineConfig} from "cypress";

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    "supportFile": "cypress/support/index.ts"
  },
});
