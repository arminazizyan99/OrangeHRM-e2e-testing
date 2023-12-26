class EmployeePage {

    firstNameField = 'input[placeholder="First name"]'
    middleNameField = 'input[placeholder="Middle name"]'
    lastNameField = 'input[placeholder="Last Name"]'
    detailBtn = ".--label-right"
    userIDField = ".oxd-input"
    statusBtn = ".oxd-radio-input"
    userNameField = ".oxd-input--active"
    passwordField = 'input[type="password"]'
    saveBtn = 'button[type="submit"]'
    viewSystem = ".oxd-table-row--with-border"
    checkBox = ".oxd-table-card-cell-checkbox"
    rowName = "[role='cell']"
    searchByName = 'input[placeholder="Type for hints..."]'
    searchBtn = ".orangehrm-left-space"
    searchByID = ".oxd-input--active"
    trashBtn = ".oxd-table-cell-action-space"
    deletePopUp = ".orangehrm-dialog-popup"
    deleteBtn = ".oxd-button--label-danger"
    successfulAddUrl = "/pim/viewPersonalDetails/empNumber"
    deleteUserApiUrl = "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees"
    searchResultManinUrl = "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&nameOrId=Sarah&employeeId="
    allEmployeeApi = "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees"
    searchResultEndUrl = "&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC"


    setUserData() {
        const EmployeeData = {
            firstName: "Sarah",
            middleName: "Lin",
            lastName: "Johns",
            userId: "114",
            userName: "Saraha",
            userStatus: "Disabled",
            password: "mypassword123"
        };
        cy.task("setMyUser", EmployeeData);
    }


    findAndDeleteEmployee(name: string) {
        cy.contains(name)
        cy.get(this.rowName).children()

    }


    specifyIdinURL(id: number) {

        return `${this.searchResultManinUrl}${id}${this.searchResultEndUrl}`
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
    fillInEmployeeDetailsFields(firstName: string, middleName: string, lastName: string, userId: string, userName: string, userStatus: status) {


        cy.get(this.firstNameField).should("have.text", "")
        cy.get(this.firstNameField).type(firstName);
        cy.get(this.middleNameField).should("have.text", "")
        cy.get(this.middleNameField).type(middleName);
        cy.get(this.lastNameField).should("have.text", "")
        cy.get(this.lastNameField).type(lastName);


        cy.get(this.userIDField).eq(4).clear().invoke("val").then((value) => {
            expect(value).to.be.empty
        })
        cy.get(this.userIDField).eq(4).type(userId);

        cy.get(this.detailBtn).should("be.visible").click()


        cy.get(this.userNameField).eq(5).invoke("val").then((value) => {
            expect(value).to.be.empty
        })

        cy.get(this.userNameField).eq(5).type(userName);

        cy.contains(userStatus).click()
    }

}
module.exports = new EmployeePage();
