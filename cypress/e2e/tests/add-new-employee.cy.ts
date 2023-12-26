import homePage from "../../pages/homePage";
import EmployeePage from "../../pages/EmployeePage";
import { assertChainer } from "../../src/models";


describe("Add,search,delete employee", () => {
    afterEach(() => {

        cy.task('resetUserData');
    });

    it("should test login functionality by confirming that login credentials are valid", () => {

        EmployeePage.setUserData();

        cy.task("getMyUser").then((UserData) => {

            cy.hideCommandLogRequest(homePage.addEmployeePage)

            EmployeePage.fillInEmployeeDetailsFields(UserData.firstName, UserData.middleName, UserData.lastName, UserData.userId, UserData.userName, UserData.userStatus)


            cy.get(EmployeePage.passwordField).each((passw) => {
                cy.wrap(passw).type(UserData.password)
            })
            cy.intercept("https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees").as("addEmployee")
            cy.get(EmployeePage.saveBtn).click()
            cy.wait("@addEmployee").its('response')
                .should(response => expect(response.statusCode).to.eq(200))
                .should(response => expect(response.body.data.firstName).to.contain(UserData.firstName))
                .should(response => expect(response.body.data.middleName).to.contain(UserData.middleName))
                .should(response => expect(response.body.data.lastName).to.contain(UserData.lastName))
                .should(response => expect(response.body.data.employeeId).to.contain(UserData.userId))

            cy.url().should(assertChainer.containText, EmployeePage.successfulAddUrl)
        })

    });


    it("should test search results, and deleting the identified user", () => {

        cy.hideCommandLogRequest(homePage.viewSystemUrl)
        EmployeePage.setUserData();

        cy.task('getMyUser').then((UserData) => {
            cy.get(EmployeePage.searchByName).first().type(UserData.firstName)
            cy.get(EmployeePage.searchByID).last().type(UserData.userId)

            const id = UserData.userId
            const searchUrl = EmployeePage.specifyIdinURL(id)

            cy.intercept(searchUrl).as("searchResult")
            cy.get(EmployeePage.searchBtn).click()

            cy.wait("@searchResult")
            cy.url().should(assertChainer.containText, homePage.viewSystemUrl)

            cy.intercept("DELETE", EmployeePage.deleteUserApiUrl).as("delete")
            cy.get(EmployeePage.trashBtn).first().click()
            cy.get(EmployeePage.deletePopUp).should(assertChainer.beVisible)
            cy.get(EmployeePage.deleteBtn).click()

            cy.wait("@delete")
        })
    });

});
