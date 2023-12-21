import { defineConfig } from "cypress";
let result;
module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        setMyUser: (param1) => {
          return (result = param1);
        },
        getMyUser: () => {
          return result;
        },
        resetUserData: () => {
             result = null
             return (result = null)
        },
      });
    },
  },
  env: {
    user: { username: "Admin", password: "admin123" },
  },
});