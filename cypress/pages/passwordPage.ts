class PasswordPage {
    passwordField = 'input[type="password"]';
    checkBox = ".oxd-table-card-cell-checkbox";
    passwordAPI = "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/auth/public/validation/password";
    passwordMessageField = ".oxd-input-group__message";

    checkifValid(password: string) {
        const isValid = password.length >= 7 && /\d/.test(password);
        return isValid ? true : false;
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
        cy.intercept("POST", this.passwordAPI).as("passwordAPI");
        cy.get(this.passwordField).each((passw) => {
            cy.wrap(passw).type(password);
        });
        cy.task("setValidPassword", password);

        cy.wait("@passwordAPI")
            .its("response")
            .then((response) => {
                expect(response.body.data).to.exist;
                const { data } = response.body;
                const { messages } = data;
                if (isValid == "valid") {
                    expect(response.statusCode).to.eq(200);
                    expect(messages).to.be.empty;
                } else if (isValid == "less then 7 chars") {
                    expect(response.statusCode).to.eq(200);
                    expect(messages).to.be.have.contain("Should have at least 7 characters");
                } else if (isValid == "number is missing") {
                    expect(response.statusCode).to.eq(200);
                    expect(messages).to.be.have.contain("Your password must contain minimum 1 number");
                } else if (isValid == "chars is less than 7 and number is missing") {
                    expect(response.statusCode).to.eq(200);
                    expect(messages).to.be.have.contain("Your password must contain minimum 1 number");
                    expect(messages).to.be.have.contain("Should have at least 7 characters");
                }
            });
    }
}

module.exports = new PasswordPage();
