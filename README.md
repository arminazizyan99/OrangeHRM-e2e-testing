# OrangeHRM-e2e-testing
Project consists of four main parts


### 1.Check scrollbar elements:

a.Purpose
Test that the text values of scrollbar elements align with the expected values, validate search field


### 2. Add New Employee with Login Details:

a.Purpose

Verify that an Admin user can successfully add a new employee by entering the required information, including login details.

b. Steps

Navigate to the employee management section in the application.
Add a new employee by providing the necessary details, including login credentials. Use cy.task to set,get and reset employee login details.
Save the new employee in the system.
Ensure that the new employee is saved in the system, and their login credentials are valid.

### 3. Password Validation:
a. Purpose

Implement a mechanism to reduce the number of password validation calls to the server while maintaining the expected functionality. Each test should be isolated and success the reduce of password validation number with .only option

b. Steps

Implement a caching mechanism using shared object contex to validate and store passwords.
Verify that the password validation call is triggered correctly.
Test the password validation API endpoint to ensure it returns accurate results for various password scenarios.

### 4. Data Cleanup:
a. Description

Implement a mechanism to clear the created data (e.g., newly created users).

b. Steps

Identify the data created during testing.
Implement a data cleanup mechanism using shared object contex to delete created users during testing.