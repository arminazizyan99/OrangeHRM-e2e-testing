import { homePage } from "../../pages/homePage";
import { assertChainer, lengthValues, fixtures, invokeOption, searchInput, textValue, numValue } from "../../src/models";

describe("Page elements", () => {
  beforeEach(("open loged page"), () => {
    cy.visit(homePage.logedPage)
  })

  it("should check scrollbar elements length", () => {
    cy.get(homePage.scrollbarElement).should(
      assertChainer.haveLength,
      lengthValues.scrollbarElement
    );
  });


  it("should test that the text values of scrollbar elements align with the expected values", () => {
    let index: number = numValue.initialIndex;
    cy.get(homePage.scrollbarElement).each((item) => {
      cy.fixture(fixtures.scrollbar).then((el) => {
        let expectedElement = el.Elements[index];
        cy.wrap(item)
          .invoke(invokeOption.text)
          .should(assertChainer.containText, expectedElement);
        index++;
      });
    });
  });


  it("should test search field", () => {
    cy.get(homePage.searchField)
      .should(assertChainer.value, textValue.emptyText)

    cy.get(homePage.searchField)
      .type(searchInput.inputText);

    cy.get(homePage.searchField)
      .should(assertChainer.value, searchInput.inputText);

    cy.get(homePage.scrollbarElement)
      .should(assertChainer.haveLength, lengthValues.searchElement)
      .and(assertChainer.haveText, searchInput.inputText);
  });
});

