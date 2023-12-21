class homePage {
  scrollbarElement = ".oxd-main-menu-item-wrapper";
  logedPage = "/dashboard/index";
  adminPage = "/admin/viewSystemUsers";
  adminAddUserPage = "/admin/saveSystemUser";
  addEmployeePage = "/pim/addEmployee";
  searchField = 'input[placeholder="Search"]';
  baseUrl = "/";
  viewSystemUrl = "/pim/viewEmployeeList";
}
module.exports = new homePage();
