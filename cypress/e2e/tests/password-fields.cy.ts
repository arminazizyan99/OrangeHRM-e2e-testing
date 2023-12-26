import homePage from "../../pages/homePage";
import PasswordPage from "../../pages/PasswordPage";
import EmployeePage from "../../pages/EmployeePage";
import { PasswordState, assertChainer, messageField, textValue } from "../../src/models";


describe(("Password"), () => {
    afterEach(() => {
        cy.task('resetPassword')
    });

    it(("should validate password and check api response for valid password"), () => {

        cy.hideCommandLogRequest(homePage.addEmployeePage)
        PasswordPage.setUserData(PasswordState.valid);
        cy.task("getMyUser").then((UserData) => {

            EmployeePage.fillInEmployeeDetailsFields(UserData.firstName, UserData.middleName, UserData.lastName, UserData.userId, UserData.userName, UserData.userStatus)


            cy.task('getValidPassword').then((password) => {
                const cachedPassword = password

                if (cachedPassword === null) {

                    PasswordPage.setPasswordandCheckValidApiCall(UserData.password, PasswordState.valid)
                }
                else {
                    cy.get(EmployeePage.passwordField).each((passw) => {
                        cy.wrap(passw).type(UserData.password)
                    })
                }
            })
        })

    })


    it(("should validate password and check api response for password with chars less than 7"), () => {

        cy.hideCommandLogRequest(homePage.addEmployeePage)

        PasswordPage.setUserData(PasswordState.lackInChars);
        cy.task("getMyUser").then((UserData) => {

            EmployeePage.fillInEmployeeDetailsFields(UserData.firstName, UserData.middleName, UserData.lastName, UserData.userId, UserData.userName, UserData.userStatus)

            cy.task('getValidPassword').then((password) => {
                const cachedPassword = password

                if (cachedPassword === null) {

                    PasswordPage.setPasswordandCheckValidApiCall(UserData.password, PasswordState.lackInChars)
                }
                else {

                    cy.get(EmployeePage.passwordField).each((passw) => {
                        cy.wrap(passw).type(UserData.password)
                    })
                    cy.get(PasswordPage.passwordMessageField).should(assertChainer.beVisible).and(assertChainer.haveText, messageField.LackCHars)
                }
            })
        })

    })


    it(("should validate password and check api response for password that does not include number"), () => {

        cy.hideCommandLogRequest(homePage.addEmployeePage)

        PasswordPage.setUserData(PasswordState.noNumber);
        cy.task("getMyUser").then((UserData) => {

            EmployeePage.fillInEmployeeDetailsFields(UserData.firstName, UserData.middleName, UserData.lastName, UserData.userId, UserData.userName, UserData.userStatus)

            cy.task('getValidPassword').then((password) => {
                const cachedPassword = password

                if (cachedPassword === null) {

                    PasswordPage.setPasswordandCheckValidApiCall(UserData.password, PasswordState.noNumber)
                }
                else {

                    cy.get(EmployeePage.passwordField).each((passw) => {
                        cy.wrap(passw).type(UserData.password)
                    })

                    cy.get(PasswordPage.passwordMessageField).should(assertChainer.beVisible).and(assertChainer.haveText, messageField.noNumber)
                }
            })
        })

    })


    it(("should validate password and check api response for password that does not include number and is less than 7 chars"), () => {

        cy.hideCommandLogRequest(homePage.addEmployeePage)

        PasswordPage.setUserData(PasswordState.lackInCharsAndNoNumber);
        cy.task("getMyUser").then((UserData) => {

            EmployeePage.fillInEmployeeDetailsFields(UserData.firstName, UserData.middleName, UserData.lastName, UserData.userId, UserData.userName, UserData.userStatus)

            cy.task('getValidPassword').then((password) => {
                const cachedPassword = password

                if (cachedPassword === null) {

                    PasswordPage.setPasswordandCheckValidApiCall(UserData.password, PasswordState.lackInCharsAndNoNumber)
                }
                else {

                    cy.get(EmployeePage.passwordField).each((passw) => {
                        cy.wrap(passw).type(UserData.password)
                    })
                    cy.get(PasswordPage.passwordMessageField).should(assertChainer.beVisible).and(assertChainer.haveText, messageField.LackCHars)
                }
            })
        })

    })







})