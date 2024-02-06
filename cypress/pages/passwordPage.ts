class PasswordPage {
  passwordField = 'input[type="password"]';
  checkBox = ".oxd-table-card-cell-checkbox";
  passwordAPI = "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/auth/public/validation/password";
  passwordMessageField = ".oxd-input-group__message";


  /**
   * Test if the user passsword is valid or not.
   * Password should contain 7 or more chars and at least one number.
   *
   * @param {string} password - User password.
   *
   */
  checkifValid(password: string) {
    const isValid = password.length >= 7 && /\d/.test(password);
    return isValid ? true : false;
  }


  /**
   * Check if password is cached previously.
   * If not set password into cache and perform api validation.
   *  
   *
   * @param {string} inputPassword - Password to be checked.
   * @param {string} errorMessage - Corresponding error message for password validation.
   *
   */

  typePasswordAndVerifyErrorMessages(inputPassword: string, errorMessage: string) {

    cy.task("getValidPassword").then((password) => {
      const cachedPassword = password;

      if (!cachedPassword) {
        cy.setPasswordPerformValidationApiCall(inputPassword, errorMessage);
      } else {
        cy.get(this.passwordField).each((field) => {
          cy.wrap(field).type(inputPassword);
        });
      }
    });
  }
}

export const passwordPage = new PasswordPage();
