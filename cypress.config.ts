import {defineConfig} from "cypress";

module.exports = defineConfig({

  e2e: {
    baseUrl: '',
    setupNodeEvents(on, config)
    {
      return require('./cypress/plugins/index.ts')(on, config)
    },
    supportFile: "cypress/support/index.ts",
    experimentalInteractiveRunEvents: true,
  },
});
