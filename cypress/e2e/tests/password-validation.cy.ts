import homePage from "../../pages/homePage";
import passwordPage from "../../pages/passwordPage";
import employeePage from "../../pages/employeePage";
import { PasswordState, assertChainer, messageField, numValue, passwordVariants, fixtures } from "../../src/models";


describe(("Password"), () => {
    afterEach(() => {

        cy.task('resetPassword')

    });

    it(("should validate password and check api response for valid password, verify that employee account is created successfuly with valid password and delete employee account"), () => {

        cy.hideCommandLogRequest(homePage.addEmployeePage)

        cy.fixture(fixtures.userDataDetails).then((data) => {
            const user = data.thirdData
            const passwordKey = PasswordState.valid

            if (passwordPage.checkifValid(data.Password[passwordKey])) {
                employeePage.setUserData(user.firstName, user.middleName, user.lastName, user.userId, user.userName, user.userStatus, data.Password[passwordKey])
            }
        })

        cy.task("getMyUser").then((UserData) => {
            const searchUrl = employeePage.specifyIdinURL(UserData.userId, UserData.firstName)

            employeePage.fillInEmployeeDetailsFields(UserData.firstName, UserData.middleName, UserData.lastName, UserData.userId, UserData.userName, UserData.userStatus)


            cy.task('getValidPassword').then((password) => {
                const cachedPassword = password

                if (!cachedPassword) {

                    passwordPage.setPasswordandCheckValidApiCall(UserData.password, PasswordState.valid)

                }
                else {
                    cy.get(employeePage.passwordField).each((passw) => {
                        cy.wrap(passw).type(UserData.password)
                    })
                }
            })
            cy.intercept(employeePage.allEmployeeApi).as("addEmployee")
            cy.get(employeePage.saveBtn).click()
            cy.wait("@addEmployee")

            cy.hideCommandLogRequest(homePage.viewSystemUrl)

            cy.get(employeePage.EmployeeName).type(UserData.firstName)
            cy.get(employeePage.EmployeeID).type(UserData.userId)

            cy.intercept(searchUrl).as("searchResult")
            cy.get(employeePage.searchBtn).click()
            cy.wait("@searchResult")

            cy.get(employeePage.employeeSearchList).should(assertChainer.haveLength, numValue.lengthOfValidSearch)

            cy.intercept("DELETE", employeePage.deleteUserApiUrl).as("deleteEmployee")
            cy.get(employeePage.trashBtn).click()
            cy.get(employeePage.deletePopUp).should(assertChainer.beVisible)
            cy.get(employeePage.deleteBtn).click()

            cy.wait("@deleteEmployee")
        })

    })


    it(("should validate password and check api response for password with chars less than 7, verify that employee account is not created"), () => {

        cy.hideCommandLogRequest(homePage.addEmployeePage)

        cy.fixture(fixtures.userDataDetails).then((data) => {
            const user = data.fourthData
            const passwordKey = PasswordState.lackInChars
            if (!passwordPage.checkifValid(data.Password[passwordKey])) {
                employeePage.setUserData(user.firstName, user.middleName, user.lastName, user.userId, user.userName, user.userStatus, data.Password[passwordKey])
            }
        })

        cy.task("getMyUser").then((UserData) => {

            employeePage.fillInEmployeeDetailsFields(UserData.firstName, UserData.middleName, UserData.lastName, UserData.userId, UserData.userName, UserData.userStatus)

            cy.task('getValidPassword').then((password) => {
                const cachedPassword = password

                if (!cachedPassword) {

                    passwordPage.setPasswordandCheckValidApiCall(UserData.password, PasswordState.lackInChars)
                }
                else {

                    cy.get(employeePage.passwordField).each((passw) => {
                        cy.wrap(passw).type(UserData.password)
                    })
                }

            })

            cy.get(passwordPage.passwordMessageField).should(assertChainer.beVisible).and(assertChainer.haveText, messageField.LackCHars)

            cy.get(employeePage.saveBtn).click()

            cy.hideCommandLogRequest(homePage.viewSystemUrl)

            cy.get(employeePage.EmployeeName).type(UserData.firstName)
            cy.get(employeePage.EmployeeID).type(UserData.userId)

            cy.get(employeePage.searchBtn).click()

            cy.get(employeePage.employeeSearchList).should(assertChainer.haveLength, numValue.lengthofInvalidSearch)
        })

    })


    it(("should validate password and check api response for password that does not include number, verify that employee account is not created"), () => {

        cy.hideCommandLogRequest(homePage.addEmployeePage)


        cy.fixture(fixtures.userDataDetails).then((data) => {
            const user = data.fourthData
            const passwordKey = PasswordState.noNumber
            if (!passwordPage.checkifValid(data.Password[passwordKey])) {
                employeePage.setUserData(user.firstName, user.middleName, user.lastName, user.userId, user.userName, user.userStatus, data.Password[passwordKey])
            }
        })

        cy.task("getMyUser").then((UserData) => {

            employeePage.fillInEmployeeDetailsFields(UserData.firstName, UserData.middleName, UserData.lastName, UserData.userId, UserData.userName, UserData.userStatus)

            cy.task('getValidPassword').then((password) => {
                const cachedPassword = password

                if (!cachedPassword) {

                    passwordPage.setPasswordandCheckValidApiCall(UserData.password, PasswordState.noNumber)
                }
                else {

                    cy.get(employeePage.passwordField).each((passw) => {
                        cy.wrap(passw).type(UserData.password)
                    })
                }
            })
            cy.get(passwordPage.passwordMessageField).should(assertChainer.beVisible).and(assertChainer.haveText, messageField.noNumber)
            cy.get(employeePage.saveBtn).click()

            cy.hideCommandLogRequest(homePage.viewSystemUrl)

            cy.get(employeePage.EmployeeName).type(UserData.firstName)
            cy.get(employeePage.EmployeeID).type(UserData.userId)

            cy.get(employeePage.searchBtn).click()

            cy.get(employeePage.employeeSearchList).should(assertChainer.haveLength, numValue.lengthofInvalidSearch)
        })

    })


    it(("should validate password and check api response for password that does not include number and is less than 7 chars, verify that employee account is not created"), () => {

        cy.hideCommandLogRequest(homePage.addEmployeePage)

        cy.fixture(fixtures.userDataDetails).then((data) => {
            const user = data.fourthData
            const passwordKey = PasswordState.lackInCharsAndNoNumber
            if (!passwordPage.checkifValid(data.Password[passwordKey])) {
                employeePage.setUserData(user.firstName, user.middleName, user.lastName, user.userId, user.userName, user.userStatus, data.Password[passwordKey])
            }
        })

        cy.task("getMyUser").then((UserData) => {

            employeePage.fillInEmployeeDetailsFields(UserData.firstName, UserData.middleName, UserData.lastName, UserData.userId, UserData.userName, UserData.userStatus)

            cy.task('getValidPassword').then((password) => {
                const cachedPassword = password

                if (!cachedPassword) {

                    passwordPage.setPasswordandCheckValidApiCall(UserData.password, PasswordState.lackInCharsAndNoNumber)
                }
                else {

                    cy.get(employeePage.passwordField).each((passw) => {
                        cy.wrap(passw).type(UserData.password)
                    })
                }
            })

            cy.get(passwordPage.passwordMessageField).should(assertChainer.beVisible).and(assertChainer.haveText, messageField.LackCHars)
            cy.get(employeePage.saveBtn).click()

            cy.hideCommandLogRequest(homePage.viewSystemUrl)

            cy.get(employeePage.EmployeeName).type(UserData.firstName)
            cy.get(employeePage.EmployeeID).type(UserData.userId)

            cy.get(employeePage.searchBtn).click()

            cy.get(employeePage.employeeSearchList).should(assertChainer.haveLength, numValue.lengthofInvalidSearch)
        })

    })


    it(("should verify that different passwords do not match and the appropriate message is displayed"), () => {

        cy.hideCommandLogRequest(homePage.addEmployeePage)

        cy.get(employeePage.detailBtn).should(assertChainer.beVisible).click()

        cy.get(employeePage.initialPassword).then((passw) => {
            cy.wrap(passw).type(passwordVariants.firstPassword)
        })
        cy.get(employeePage.matchedPassword).then((passw) => {
            cy.wrap(passw).type(passwordVariants.secondPassword)
        })

        cy.get(passwordPage.passwordMessageField).should(assertChainer.beVisible).and(assertChainer.haveText, messageField.notMatch)
    })

})