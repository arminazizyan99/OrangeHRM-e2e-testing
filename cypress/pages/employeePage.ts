import { prototype } from "mocha";

class EmployeePage {
    firstNameField = 'input[placeholder="First Name"]';
    middleNameField = 'input[placeholder="Middle Name"]';
    lastNameField = 'input[placeholder="Last Name"]';
    detailBtn = ".--label-right";
    userIDField = ".oxd-input:eq(4)";
    statusBtn = ".oxd-radio-input";
    userNameField = ".oxd-input--active:eq(5)";
    passwordField = 'input[type="password"]';
    initialPassword = 'input[type="password"]:first';
    matchedPassword = 'input[type="password"]:last';
    saveBtn = 'button[type="submit"]';
    viewSystem = ".oxd-table-row--with-border";
    checkBox = ".oxd-table-card-cell-checkbox";
    rowName = "[role='cell']";
    searchByName = 'input[placeholder="Type for hints..."]';
    EmployeeName = 'input[placeholder="Type for hints..."]:first';
    EmployeeID = ".oxd-input--active:last";
    searchBtn = ".orangehrm-left-space";
    searchByID = ".oxd-input--active:eq(5)";
    trashBtn = ".oxd-table-cell-action-space:first";
    deletePopUp = ".orangehrm-dialog-popup";
    deleteBtn = ".oxd-button--label-danger";
    employeeSearchList = ".oxd-table-row--clickable";
    titleOfDetailsPage = ".oxd-text--h6:eq(1)";
    successfulAddUrl = "/pim/viewPersonalDetails/empNumber";
    deleteUserApiUrl = "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees";
    searchResultMainUrl = "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&nameOrId=";
    allEmployeeApi = "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees";
    searchResultEndUrl = "&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC";
    personalDetailsApi = "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees/";


    setUserData(firstName, middleName, lastName, userId, userName, userStatus, password) {
        const setValue = (setSetter: string[], setValue: string[]) => {
            for (let elem in setSetter) {
                cy.task("UserDataSetter", {
                    setter: setSetter[elem],
                    value: setValue[elem],
                });
            }
        };
        const setterArray = ["firstName", "middleName", "lastName", "userId", "userName", "userStatus", "password"];
        const setValueArray = [firstName, middleName, lastName, userId, userName, userStatus, password];

        setValue(setterArray, setValueArray);
    }

    /**
     * Add current employee id and name to url of api.
     *
     * @param {number} id - The id name of the employee.
     * @param {string} name - The first name of the employee.
     *
     */
    specifyIdinURL(id: number, name: string) {
        return `${this.searchResultMainUrl}${name}&employeeId=${id}${this.searchResultEndUrl}`;
    }

    /**
     * Fill in the employee details fields with the specified information.
     *
     * @param {string} firstName - The first name of the employee.
     * @param {string} middleName - The middle name of the employee.
     * @param {string} lastName - The last name of the employee.
     * @param {string} userId - The user ID of the employee.
     * @param {string} userName - The user name of the employee.
     * @param {status} userStatus - The status of the user (e.g., 'Enabled', 'Disabled').
     *
     */
    fillInEmployeeDetailsFields(firstName: string, middleName: string, lastName: string, userId: string, userName: string, userStatus: string) {
        const getAndType = (selector: string, value: string) => {
            cy.get(selector).should("have.text", "");
            cy.get(selector).type(value);
        };

        getAndType(this.firstNameField, firstName);
        getAndType(this.middleNameField, middleName);
        getAndType(this.lastNameField, lastName);

        cy.get(this.userIDField)
            .clear()
            .invoke("val")
            .then((value) => {
                expect(value).to.be.empty;
            });

        cy.get(this.userIDField).type(userId);

        cy.get(this.detailBtn).should("be.visible").click();

        cy.get(this.userNameField)
            .invoke("val")
            .then((value) => {
                expect(value).to.be.empty;
            });

        cy.get(this.userNameField).type(userName);

        cy.contains(userStatus).click();
    }
    
    /**
     * Deletes an employee using the provided employee number.
     *
     * @param {number} empNumber - The employee number of the employee to be deleted.
     *
     */
    deleteEmployee(empNumber: number) {
        cy.request({
            method: "DELETE",
            url: this.deleteUserApiUrl,
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                ids: [empNumber],
            },
            //failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(200);
        });
    }
}
module.exports = new EmployeePage();
