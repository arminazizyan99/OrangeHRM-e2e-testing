import { homePage } from "../../pages/homePage";
import { employeePage } from "../../pages/employeePage";
import { assertChainer, fixtures, numValue, statusCode } from "../../src/models";

describe("Add,search,delete employee", () => {
    afterEach(" delete newly created employee account via api call", () => {
        cy.task("getMyUser").then((UserData) => {
            cy.deleteEmployee(UserData.userEmpNumber, employeePage.userApiUrl);
        });
        cy.task("resetUserData");
    });

    it("should verify employee creation functionality by confirming that user credentials are saved and valid and delete the employee account", () => {
        cy.fixture(fixtures.userDataDetails).then((data) => {
            const user = data.firstData;
            employeePage.setUserData(user.firstName, user.middleName, user.lastName, user.userId, user.userName, user.userStatus, user.password);
        });

        cy.task("getMyUser").then((UserData) => {
            cy.hideCommandLogRequest(homePage.addEmployeePage);

            employeePage.fillInEmployeeDetailsFields(
                UserData.firstName,
                UserData.middleName,
                UserData.lastName,
                UserData.userId,
                UserData.userName,
                UserData.userStatus
            );

            cy.get(employeePage.passwordField).each((passwordField) => cy.wrap(passwordField).type(UserData.password));

            cy.intercept(employeePage.userApiUrl).as("addEmployee");
            cy.get(employeePage.saveBtn).click();
            cy.wait("@addEmployee").then(({ response }) => {
                expect(response.body.data).to.exist;

                const { data } = response.body;
                const { empNumber, firstName, middleName, lastName, employeeId } = data;

                cy.task("UserDataSetter", { setter: "userEmpNumber", value: empNumber });

                expect(response.statusCode).to.eq(statusCode.successful);
                expect(firstName).to.contain(UserData.firstName);
                expect(middleName).to.contain(UserData.middleName);
                expect(lastName).to.contain(UserData.lastName);
                expect(employeeId).to.contain(UserData.userId);
            });

            cy.url().should(assertChainer.containText, employeePage.successfulAddUrl);

            const userFieldValue = [
                `${UserData.firstName} ${UserData.lastName}`,
                UserData.firstName,
                UserData.middleName,
                UserData.lastName,
                UserData.userId,
            ];

            cy.checkPersonDetailsPage(userFieldValue);
        });
    });

    it("should create employee,test search results, and delete the newly created employee account", () => {
        cy.fixture(fixtures.userDataDetails).then((data) => {
            const user = data.secondData;
            employeePage.setUserData(user.firstName, user.middleName, user.lastName, user.userId, user.userName, user.userStatus, user.password);
        });

        cy.task("getMyUser").then((UserData) => {
            const searchUrl = employeePage.specifyIdinURL(UserData.userId, UserData.firstName);

            cy.hideCommandLogRequest(homePage.addEmployeePage);

            employeePage.fillInEmployeeDetailsFields(
                UserData.firstName,
                UserData.middleName,
                UserData.lastName,
                UserData.userId,
                UserData.userName,
                UserData.userStatus
            );

            cy.get(employeePage.passwordField).each((passw) => cy.wrap(passw).type(UserData.password));

            cy.intercept(employeePage.userApiUrl).as("addEmployee");
            cy.get(employeePage.saveBtn).click();
            cy.wait("@addEmployee");

            cy.hideCommandLogRequest(homePage.viewSystemUrl);

            cy.intercept(searchUrl).as("searchResult");

            employeePage.fillInSearchField(UserData.firstName, UserData.userId);
            cy.get(employeePage.searchBtn).click();
            cy.get(employeePage.employeeSearchList).should(assertChainer.haveLength, numValue.lengthOfValidSearch);

            cy.wait("@searchResult").then(({ response }) => {
                expect(response.body.data).to.exist;
                const number = response.body.data[numValue.empNumberIndex].empNumber;
                cy.task("UserDataSetter", { setter: "userEmpNumber", value: number });
            });
        });
    });
});
