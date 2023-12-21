class EmployeePage {

    firstNameField = 'input[placeholder="First Name"]'
    middleNameField = 'input[placeholder="Middle Name"]'
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

}
module.exports = new EmployeePage();
