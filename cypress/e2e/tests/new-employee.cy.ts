import homePage from "../../pages/homePage";
import EmployeePage from "../../pages/EmployeePage";
import { assertChainer, numValue } from "../../src/models";


describe("Add,search,delete employee", () => {
    afterEach((" delete newly created employee account via api call"), () => {

        cy.task('resetUserData')
        cy.task('getEmpNumber').then((number) => {

            cy.wrap(number).as('Empnumber')
        })
        cy.get('@Empnumber').then((number) => {

            EmployeePage.deleteEmployee(number)

        })

        cy.task('resetEmpNumber')
    });

    it("should verify employee creation functionality by confirming that user credentials are saved and valid and delete the employee account", () => {

        EmployeePage.setUserData()

        cy.task("getMyUser").then((UserData) => {

            cy.hideCommandLogRequest(homePage.addEmployeePage)

            EmployeePage.fillInEmployeeDetailsFields(UserData.firstName, UserData.middleName, UserData.lastName, UserData.userId, UserData.userName, UserData.userStatus)


            cy.get(EmployeePage.passwordField).each((passw) => {
                cy.wrap(passw).type(UserData.password)
            })
            cy.intercept(EmployeePage.allEmployeeApi).as("addEmployee")
            cy.get(EmployeePage.saveBtn).click()
            cy.wait("@addEmployee").its('response').then((response) => {
                const number = response.body.data.empNumber

                cy.wrap(number).as('EmpNumber');
                expect(response.statusCode).to.eq(200)
                expect(response.body.data.firstName).to.contain(UserData.firstName)
                expect(response.body.data.middleName).to.contain(UserData.middleName)
                expect(response.body.data.lastName).to.contain(UserData.lastName)
                expect(response.body.data.employeeId).to.contain(UserData.userId)
            })

            cy.get('@EmpNumber').then((number) => {

                cy.task('setEmpNumber', number)

            })
            cy.url().should(assertChainer.containText, EmployeePage.successfulAddUrl)

            EmployeePage.checkPersonDetailsPage(UserData.firstName, UserData.middleName, UserData.lastName, UserData.userId)


        })
    })


    it("should create employee,test search results, and delete the newly created employee account", () => {


        EmployeePage.setNewUserData();

        cy.task('getMyUser').then((UserData) => {
            cy.hideCommandLogRequest(homePage.addEmployeePage)

            EmployeePage.fillInEmployeeDetailsFields(UserData.firstName, UserData.middleName, UserData.lastName, UserData.userId, UserData.userName, UserData.userStatus)

            cy.get(EmployeePage.passwordField).each((passw) => {
                cy.wrap(passw).type(UserData.password)
            })

            cy.intercept(EmployeePage.allEmployeeApi).as("addEmployee")
            cy.get(EmployeePage.saveBtn).click()
            cy.wait("@addEmployee").its('response')

            cy.hideCommandLogRequest(homePage.viewSystemUrl)

            cy.get(EmployeePage.searchByName).first().type(UserData.firstName)
            cy.get(EmployeePage.searchByID).last().type(UserData.userId)

            const searchUrl = EmployeePage.specifyIdinURL(UserData.userId, UserData.firstName)

            cy.intercept(searchUrl).as("searchResult")
            cy.get(EmployeePage.searchBtn).click()
            cy.get(EmployeePage.employeeSearchList).should(assertChainer.haveLength, numValue.lengthofInvalidSearch)


            cy.wait("@searchResult").its('response').then((response) => {
                const number = response.body.data[0].empNumber

                cy.wrap(number).as('EmpNumber')
            })

            cy.get('@EmpNumber').then((number) => {

                cy.task('setEmpNumber', number)

            })

        })
    })
})
