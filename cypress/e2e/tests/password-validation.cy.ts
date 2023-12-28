import homePage from "../../pages/homePage";
import PasswordPage from "../../pages/PasswordPage";
import EmployeePage from "../../pages/EmployeePage";
import { PasswordState, assertChainer, messageField, numValue, passwordVariants } from "../../src/models";


describe(("Password"), () => {


    it(("should validate password and check api response for valid password, verify that employee account is created successfuly with valid password and delete employee account"), () => {

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
            cy.intercept(EmployeePage.allEmployeeApi).as("addEmployee")
            cy.get(EmployeePage.saveBtn).click()
            cy.wait("@addEmployee")

            cy.hideCommandLogRequest(homePage.viewSystemUrl)

            cy.get(EmployeePage.searchByName).first().type(UserData.firstName)
            cy.get(EmployeePage.searchByID).last().type(UserData.userId)

            const searchUrl = EmployeePage.specifyIdinURL(UserData.userId, UserData.firstName)

            cy.intercept(searchUrl).as("searchResult")
            cy.get(EmployeePage.searchBtn).click()
            cy.wait("@searchResult")

            cy.get(EmployeePage.employeeSearchList).should(assertChainer.haveLength, numValue.lengthOfValidSearch)

            cy.intercept("DELETE", EmployeePage.deleteUserApiUrl).as("deleteEmployee")
            cy.get(EmployeePage.trashBtn).first().click()
            cy.get(EmployeePage.deletePopUp).should(assertChainer.beVisible)
            cy.get(EmployeePage.deleteBtn).click()

            cy.wait("@deleteEmployee")
        })

    })


    it(("should validate password and check api response for password with chars less than 7, verify that employee account is not created"), () => {

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
                }

            })

            cy.get(PasswordPage.passwordMessageField).should(assertChainer.beVisible).and(assertChainer.haveText, messageField.LackCHars)

            cy.get(EmployeePage.saveBtn).click()

            cy.hideCommandLogRequest(homePage.viewSystemUrl)

            cy.get(EmployeePage.searchByName).first().type(UserData.firstName)
            cy.get(EmployeePage.searchByID).last().type(UserData.userId)

            cy.get(EmployeePage.searchBtn).click()

            cy.get(EmployeePage.employeeSearchList).should(assertChainer.haveLength, numValue.lengthofInvalidSearch)
        })

    })


    it(("should validate password and check api response for password that does not include number, verify that employee account is not created"), () => {

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
                }
            })
            cy.get(PasswordPage.passwordMessageField).should(assertChainer.beVisible).and(assertChainer.haveText, messageField.noNumber)
            cy.get(EmployeePage.saveBtn).click()

            cy.hideCommandLogRequest(homePage.viewSystemUrl)

            cy.get(EmployeePage.searchByName).first().type(UserData.firstName)
            cy.get(EmployeePage.searchByID).last().type(UserData.userId)

            cy.get(EmployeePage.searchBtn).click()

            cy.get(EmployeePage.employeeSearchList).should(assertChainer.haveLength, numValue.lengthofInvalidSearch)
        })

    })


    it(("should validate password and check api response for password that does not include number and is less than 7 chars, verify that employee account is not created"), () => {

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
                }
            })

            cy.get(PasswordPage.passwordMessageField).should(assertChainer.beVisible).and(assertChainer.haveText, messageField.LackCHars)
            cy.get(EmployeePage.saveBtn).click()

            cy.hideCommandLogRequest(homePage.viewSystemUrl)

            cy.get(EmployeePage.searchByName).first().type(UserData.firstName)
            cy.get(EmployeePage.searchByID).last().type(UserData.userId)

            cy.get(EmployeePage.searchBtn).click()

            cy.get(EmployeePage.employeeSearchList).should(assertChainer.haveLength, numValue.lengthofInvalidSearch)
        })

    })


    it(("should verify that different passwords do not match and the appropriate message is displayed"), () => {

        cy.hideCommandLogRequest(homePage.addEmployeePage)

        cy.get(EmployeePage.detailBtn).should(assertChainer.beVisible).click()

        cy.get(EmployeePage.passwordField).first().then((passw) => {
            cy.wrap(passw).type(passwordVariants.firstPassword)
        })
        cy.get(EmployeePage.passwordField).last().then((passw) => {
            cy.wrap(passw).type(passwordVariants.secondPassword)
        })

        cy.get(PasswordPage.passwordMessageField).should(assertChainer.beVisible).and(assertChainer.haveText, messageField.notMatch)
    })

})