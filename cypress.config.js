const { defineConfig } = require("cypress");

module.exports = defineConfig({
  pageLoadTimeout: 40000,
  defaultCommandTimeout: 4000,
  retries: 1,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    testIsolation: false
  },
});
