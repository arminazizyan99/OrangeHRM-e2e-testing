import { defineConfig } from "cypress"
require('dotenv').config()
let userData = {};
let validPassword;
let empNumber;
let valid = false;
module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php",
    setupNodeEvents(on, config) {
      // implement node event listeners here

      on("task", {
        UserDataSetter: ({ setter, value }) => {
          userData[setter] = value

          return userData
      },
        getMyUser: () => {
          return userData;
        },
        resetUserData: () => {
          userData = {}
          return userData
        },
        setEmpNumber: (param1) => {
          return (empNumber = param1)
        },
        getEmpNumber: () => {
          return empNumber
        },
        resetEmpNumber: () => {
          empNumber = null
          return empNumber
        },

        setValidPassword: (password) => {
          valid = true
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
    env: {
      username: process.env.LOGIN_USER,
      password: process.env.LOGIN_PASSWORD,
    },
  },
});
