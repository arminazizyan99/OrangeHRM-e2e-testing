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
    userApiUrl = "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees";
    searchResultMainUrl = "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&nameOrId=";
    searchResultEndUrl = "&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC";


    /** 
    * Set user details using UserDataSetter task.
    *
    * @param {string} firstName - The first name of the employee.
    * @param {string} middleName - The middle name of the employee.
    * @param {string} lastName - The last name of the employee.
    * @param {number} userId - The user ID of the employee.
    * @param {string} userName - The user name of the employee.
    * @param {number} userStatus - The status of the user (e.g., 'Enabled', 'Disabled').
    * @param {string} password - User's password.
    * 
    *
    */
    setUserData(firstName: string, middleName: string, lastName: string, userId: number, userName: string, userStatus: number, password: string) {

        const setValue = (setSetter: string[], setValue: string[]) => {

            for (let element in setSetter) {
                cy.task("UserDataSetter", {
                    setter: setSetter[element],
                    value: setValue[element],
                });
            }
        };
        const setterArray = ["firstName", "middleName", "lastName", "userId", "userName", "userStatus", "password"];
        const setValueArray = [firstName, middleName, lastName, userId, userName, userStatus, password];
        const stringValuesArray: string[] = setValueArray.map((value) => String(value));

        setValue(setterArray, stringValuesArray);
    }

    /**
     * Add current employee id and name to the url of api.
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
     * @param {number} userStatus - The status of the user (e.g., 'Enabled', 'Disabled').
     *
     */
    fillInEmployeeDetailsFields(firstName: string, middleName: string, lastName: string, userId: string, userName: string, userStatus: string) {
        const getAndType = (selector: string, value: string) => {
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

        cy.get(this.detailBtn).click();

        cy.get(this.userNameField)
            .invoke("val")
            .then((value) => {
                expect(value).to.be.empty;
            });

        cy.get(this.userNameField).type(userName);
        cy.contains(userStatus).click();

    }

    fillInSearchField(firstName: string, userID: number) {

        cy.get(this.EmployeeName).type(firstName);
        cy.get(this.EmployeeID).type(`${userID}`);
    }
}
export const employeePage = new EmployeePage();