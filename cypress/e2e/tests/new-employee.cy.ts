import homePage from "../../pages/homePage";
import employeePage from "../../pages/employeePage";
import { assertChainer, fixtures, numValue, statusCode } from "../../src/models";


describe("Add,search,delete employee", () => {
    afterEach((" delete newly created employee account via api call"), () => {

        cy.task('resetUserData')
        cy.task('getEmpNumber').then((number) => {
            employeePage.deleteEmployee(number)
        })

        cy.task('resetEmpNumber')
    });

    it("should verify employee creation functionality by confirming that user credentials are saved and valid and delete the employee account", () => {

        cy.fixture(fixtures.userDataDetails).then((data) => {
            const user = data.firstData
            employeePage.setUserData(user.firstName, user.middleName, user.lastName, user.userId, user.userName, user.userStatus, user.password)
        })

        cy.task("getMyUser").then((UserData) => {

            cy.hideCommandLogRequest(homePage.addEmployeePage)

            employeePage.fillInEmployeeDetailsFields(UserData.firstName, UserData.middleName, UserData.lastName, UserData.userId, UserData.userName, UserData.userStatus)

            cy.get(employeePage.passwordField).each((passw) => cy.wrap(passw).type(UserData.password))

            cy.intercept(employeePage.allEmployeeApi).as("addEmployee")
            cy.get(employeePage.saveBtn).click()
            cy.wait("@addEmployee").its('response').then((response) => {

                const { data } = response.body;
                const { empNumber, firstName, middleName, lastName, employeeId } = data;

                cy.task('setEmpNumber', empNumber)

                expect(response.statusCode).to.eq(statusCode.successful)
                expect(firstName).to.contain(UserData.firstName)
                expect(middleName).to.contain(UserData.middleName)
                expect(lastName).to.contain(UserData.lastName)
                expect(employeeId).to.contain(UserData.userId)
            })

            cy.url().should(assertChainer.containText, employeePage.successfulAddUrl)

            employeePage.checkPersonDetailsPage(UserData.firstName, UserData.middleName, UserData.lastName, UserData.userId)

        })
    })


    it("should create employee,test search results, and delete the newly created employee account", () => {


        cy.fixture(fixtures.userDataDetails).then((data) => {
            const user = data.secondData
            employeePage.setUserData(user.firstName, user.middleName, user.lastName, user.userId, user.userName, user.userStatus, user.password)
        })

        cy.task('getMyUser').then((UserData) => {
            const searchUrl = employeePage.specifyIdinURL(UserData.userId, UserData.firstName)
            
            cy.hideCommandLogRequest(homePage.addEmployeePage)

            employeePage.fillInEmployeeDetailsFields(UserData.firstName, UserData.middleName, UserData.lastName, UserData.userId, UserData.userName, UserData.userStatus)

            cy.get(employeePage.passwordField).each((passw) => cy.wrap(passw).type(UserData.password))

            cy.intercept(employeePage.allEmployeeApi).as("addEmployee")
            cy.get(employeePage.saveBtn).click()
            cy.wait("@addEmployee").its('response')

            cy.hideCommandLogRequest(homePage.viewSystemUrl)

            cy.get(employeePage.EmployeeName).type(UserData.firstName)
            cy.get(employeePage.EmployeeID).type(UserData.userId)

            cy.intercept(searchUrl).as("searchResult")
            cy.get(employeePage.searchBtn).click()
            cy.get(employeePage.employeeSearchList).should(assertChainer.haveLength, numValue.lengthOfValidSearch)


            cy.wait("@searchResult").its('response').then((response) => {
                const number = response.body.data[0].empNumber
                cy.task('setEmpNumber', number)

            })

        })
    })
})
