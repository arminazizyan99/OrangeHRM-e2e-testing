import { homePage } from "../../pages/homePage";
import { passwordPage } from "../../pages/passwordPage";
import { employeePage } from "../../pages/employeePage";
import { PasswordState, assertChainer, messageField, numValue, passwordVariants, fixtures } from "../../src/models";

describe("Password", () => {
  afterEach(() => {
    cy.task("resetPassword");
    cy.task("resetUserData");
  });

  it("should validate password and check api response for valid password, verify that employee account is created successfuly with valid password and delete employee account", () => {
    cy.hideCommandLogRequest(homePage.addEmployeePage);

    cy.fixture(fixtures.userDataDetails).then((data) => {
      const user = data.thirdData;
      const passwordKey = PasswordState.valid;
      const validPassword = passwordPage.checkifValid(data.Password[passwordKey]);

      if (validPassword) {
        employeePage.setUserData(
          user.firstName,
          user.middleName,
          user.lastName,
          user.userId,
          user.userName,
          user.userStatus,
          data.Password[passwordKey]
        );
      }
    });

    cy.task("getMyUser").then((UserData) => {
      const searchUrl = employeePage.specifyIdinURL(UserData.userId, UserData.firstName);

      employeePage.fillInEmployeeDetailsFields(
        UserData.firstName,
        UserData.middleName,
        UserData.lastName,
        UserData.userId,
        UserData.userName,
        UserData.userStatus
      );

      passwordPage.typePasswordAndVerifyErrorMessages(UserData.password, PasswordState.valid);

      cy.intercept(employeePage.userApiUrl).as("addEmployee");
      cy.get(employeePage.saveBtn).click();
      cy.wait("@addEmployee");

      cy.hideCommandLogRequest(homePage.viewSystemUrl);

      employeePage.fillInSearchField(UserData.firstName, UserData.userId);

      cy.intercept(searchUrl).as("searchResult");
      cy.get(employeePage.searchBtn).click();
      cy.wait("@searchResult");

      cy.get(employeePage.employeeSearchList).should(assertChainer.haveLength, numValue.lengthOfValidSearch);

      cy.intercept("DELETE", employeePage.userApiUrl).as("deleteEmployee");
      cy.get(employeePage.trashBtn).click();
      cy.get(employeePage.deletePopUp).should(assertChainer.beVisible);
      cy.get(employeePage.deleteBtn).click();
      cy.wait("@deleteEmployee");
    });
  });

  it("should validate password and check api response for password with chars less than 7, verify that employee account is not created", () => {
    cy.hideCommandLogRequest(homePage.addEmployeePage);

    cy.fixture(fixtures.userDataDetails).then((data) => {
      const user = data.fourthData;
      const passwordKey = PasswordState.lackInChars;
      const validPassword = passwordPage.checkifValid(data.Password[passwordKey]);

      if (!validPassword) {
        employeePage.setUserData(
          user.firstName,
          user.middleName,
          user.lastName,
          user.userId,
          user.userName,
          user.userStatus,
          data.Password[passwordKey]
        );
      }
    });

    cy.task("getMyUser").then((UserData) => {
      employeePage.fillInEmployeeDetailsFields(
        UserData.firstName,
        UserData.middleName,
        UserData.lastName,
        UserData.userId,
        UserData.userName,
        UserData.userStatus
      );

      passwordPage.typePasswordAndVerifyErrorMessages(UserData.password, PasswordState.lackInChars);
      cy.get(passwordPage.passwordMessageField).should(assertChainer.beVisible).and(assertChainer.haveText, messageField.LackCHars);
      cy.get(employeePage.saveBtn).click();

      cy.hideCommandLogRequest(homePage.viewSystemUrl);

      employeePage.fillInSearchField(UserData.firstName, UserData.userId);
      cy.get(employeePage.searchBtn).click();

      cy.get(employeePage.employeeSearchList).should(assertChainer.haveLength, numValue.lengthofInvalidSearch);
    });
  });

  it("should validate password and check api response for password that does not include number, verify that employee account is not created", () => {
    cy.hideCommandLogRequest(homePage.addEmployeePage);

    cy.fixture(fixtures.userDataDetails).then((data) => {
      const user = data.fourthData;
      const passwordKey = PasswordState.noNumber;
      const validPassword = passwordPage.checkifValid(data.Password[passwordKey]);

      if (!validPassword) {
        employeePage.setUserData(
          user.firstName,
          user.middleName,
          user.lastName,
          user.userId,
          user.userName,
          user.userStatus,
          data.Password[passwordKey]
        );
      }
    });

    cy.task("getMyUser").then((UserData) => {
      employeePage.fillInEmployeeDetailsFields(
        UserData.firstName,
        UserData.middleName,
        UserData.lastName,
        UserData.userId,
        UserData.userName,
        UserData.userStatus
      );

      passwordPage.typePasswordAndVerifyErrorMessages(UserData.password, PasswordState.noNumber);
      cy.get(passwordPage.passwordMessageField).should(assertChainer.beVisible).and(assertChainer.haveText, messageField.noNumber);
      cy.get(employeePage.saveBtn).click();

      cy.hideCommandLogRequest(homePage.viewSystemUrl);

      employeePage.fillInSearchField(UserData.firstName, UserData.userId);

      cy.get(employeePage.searchBtn).click();
      cy.get(employeePage.employeeSearchList).should(assertChainer.haveLength, numValue.lengthofInvalidSearch);
    });
  });

  it("should validate password and check api response for password that does not include number and is less than 7 chars, verify that employee account is not created", () => {
    cy.hideCommandLogRequest(homePage.addEmployeePage);

    cy.fixture(fixtures.userDataDetails).then((data) => {
      const user = data.fourthData;
      const passwordKey = PasswordState.lackInCharsAndNoNumber;
      const validPassword = passwordPage.checkifValid(data.Password[passwordKey]);

      if (!validPassword) {
        employeePage.setUserData(
          user.firstName,
          user.middleName,
          user.lastName,
          user.userId,
          user.userName,
          user.userStatus,
          data.Password[passwordKey]
        );
      }
    });

    cy.task("getMyUser").then((UserData) => {
      employeePage.fillInEmployeeDetailsFields(
        UserData.firstName,
        UserData.middleName,
        UserData.lastName,
        UserData.userId,
        UserData.userName,
        UserData.userStatus
      );

      passwordPage.typePasswordAndVerifyErrorMessages(UserData.password, PasswordState.lackInCharsAndNoNumber);
      cy.get(passwordPage.passwordMessageField).should(assertChainer.beVisible).and(assertChainer.haveText, messageField.LackCHars);
      cy.get(employeePage.saveBtn).click();

      cy.hideCommandLogRequest(homePage.viewSystemUrl);

      employeePage.fillInSearchField(UserData.firstName, UserData.userId);

      cy.get(employeePage.searchBtn).click();

      cy.get(employeePage.employeeSearchList).should(assertChainer.haveLength, numValue.lengthofInvalidSearch);
    });
  });

  it("should verify that different passwords do not match and the appropriate message is displayed", () => {
    cy.hideCommandLogRequest(homePage.addEmployeePage);

    cy.get(employeePage.detailBtn).should(assertChainer.beVisible).click();

    cy.get(employeePage.initialPassword).then((field) => {
      cy.wrap(field).type(passwordVariants.firstPassword);
    });

    cy.get(employeePage.matchedPassword).then((field) => {
      cy.wrap(field).type(passwordVariants.secondPassword);
    });

    cy.get(passwordPage.passwordMessageField).should(assertChainer.beVisible).and(assertChainer.haveText, messageField.notMatch);
  });
});
