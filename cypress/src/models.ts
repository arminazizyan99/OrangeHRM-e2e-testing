export enum assertChainer {
  beVisible = "be.visible",
  notVisible = "not.visible",
  noValue = "not.have.value",
  value = "have.value",
  beDesabled = "be.disabled",
  beEnabled = "be.enabled",
  containText = "contain",
  haveText = "have.text",
  equal = "be.equal",
  notequal = "not.equal",
  haveLength = "have.length",
  beEmpty = "be.empty",
  notEmpty = "not.empty",
}

export enum relativeUrl {
  logedPageUrl = "/web/index.php/dashboard/index",
}

export enum lengthValues {
  scrollbarElement = 12,
  searchElement = 1,
}

export enum fixtures {
  scrollbar = "scrollBar.json",
}

export enum invokeOption {
  text = "text",
  value = 'val'
}


export enum PasswordState {
  valid = "valid",
  lackInChars = 'less then 7 chars',
  noNumber = 'number is missing',
  lackInCharsAndNoNumber = 'chars is less than 7 and number is missing'
}


export enum textValue {
  emptyText = "",
}
export enum numValue {
  lengthOfValidSearch = 1,
  lengthofInvalidSearch = 0
}

export enum searchInput {
  inputText = "Directory",
}


export enum messageField {
  LackCHars = "Should have at least 7 characters",
  noNumber = "Your password must contain minimum 1 number",
  notMatch = "Passwords do not match"
}


export enum passwordVariants {
  firstPassword = "myPassword25",
  secondPassword = "Password25"
}