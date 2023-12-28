class PasswordPage {

    passwordField = 'input[type="password"]'
    checkBox = ".oxd-table-card-cell-checkbox"
    passwordAPI = "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/auth/public/validation/password"
    passwordMessageField = '.oxd-input-group__message'


    /**
     * Set different users data details using Cypress task.
     *
     * @param {string} isValid - The expected validity status for password ('valid' or 'less then 7 chars' or 'number is missing'
     * or 'chars is less than 7 and number is missing').
     *
    */

    setUserData(isValid: string) {

        if (isValid == "valid") {
            let EmployeeData = {
                firstName: "Anne",
                middleName: "Joy",
                lastName: "Poline",
                userId: "147",
                userName: "Candice",
                userStatus: "Disabled",
                password: "password77"
            };
            cy.task("setMyUser", EmployeeData);
        }

        else if (isValid == "less then 7 chars") {
            let EmployeeData = {
                firstName: "Rita",
                middleName: "Koul",
                lastName: "Holmes",
                userId: "789",
                userName: "Rita15",
                userStatus: "Disabled",
                password: "passwo"
            };
            cy.task("setMyUser", EmployeeData);
        }

        else if (isValid == "number is missing") {
            let EmployeeData = {
                firstName: "Yan",
                middleName: "John",
                lastName: "Joshua",
                userId: "456",
                userName: "Yan25",
                userStatus: "Enabled",
                password: "passwor"
            };
            cy.task("setMyUser", EmployeeData);
        }

        else if (isValid == "chars is less than 7 and number is missing") {
            let EmployeeData = {
                firstName: "Martin",
                middleName: "Yan",
                lastName: "Crawl",
                userId: "123",
                userName: "Candice",
                userStatus: "Disabled",
                password: "passwo"
            };
            cy.task("setMyUser", EmployeeData);
        }
    }


    /**
     * Set a password using Cypress tasks and check an API call for validity.
     *
     * @param {string} password - The password to set.
     * @param {string} isValid - The expected validity status ('valid' or 'less then 7 chars' or 'number is missing'
     * or 'chars is less than 7 and number is missing').
     *
     *
     */
    setPasswordandCheckValidApiCall(password: string, isValid: string) {

        cy.intercept("POST", this.passwordAPI).as("passwordAPI")
        cy.get(this.passwordField).each((passw) => {
            cy.wrap(passw).type(password)
        })
        cy.task('setValidPassword', password);

        if (isValid == "valid") {
            cy.wait("@passwordAPI").its('response')
                .should(response => expect(response.statusCode).to.eq(200))
                .should(response => expect(response.body.data.messages).to.be.empty)
        }
        else if (isValid == "less then 7 chars") {
            cy.wait("@passwordAPI").its('response')
                .should(response => expect(response.statusCode).to.eq(200))
                .should(response => expect(response.body.data.messages).to.be.have.contain("Should have at least 7 characters"))
        }
        else if (isValid == "number is missing") {
            cy.wait("@passwordAPI").its('response')
                .should(response => expect(response.statusCode).to.eq(200))
                .should(response => expect(response.body.data.messages).to.be.have.contain("Your password must contain minimum 1 number"))
        }
        else if (isValid == "chars is less than 7 and number is missing") {
            cy.wait("@passwordAPI").its('response')
                .should(response => expect(response.statusCode).to.eq(200))
                .should(response => expect(response.body.data.messages).to.be.have.contain("Your password must contain minimum 1 number"))
                .should(response => expect(response.body.data.messages).to.be.have.contain("Should have at least 7 characters"))
        }

    }


}

module.exports = new PasswordPage()