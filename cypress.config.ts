import { defineConfig } from "cypress";
let result;
let validPassword;
let empNumber;
let valid = false;
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
        setEmpNumber: (param1) => {
          return (empNumber = param1);
        },
        getEmpNumber: () => {
          return empNumber
        },
        resetEmpNumber: () => {
          result = null
          return (result = null)
        },

        setValidPassword: (password) => {

          if (password.length >= 7 && /\d/.test(password)) {
            valid = true
          }
          else {
            valid = false
          }
          return (validPassword = password)
        },

        getValidPassword: () => {

          if (valid === false) {
            validPassword = null
          }
          return validPassword

        },
        resetPassword: () => {
          valid = false
          return (validPassword = null)
        },

      });
    },
  },
  env: {
    user: { username: "Admin", password: "admin123" },
  },
});
