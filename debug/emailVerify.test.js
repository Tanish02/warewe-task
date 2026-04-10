const validateEmail = require("../src/validator");

test("valid email format", () => {
  expect(validateEmail("user@gmail.com")).toBe(true);
}); // valid email

// if invalid email
test("invalid email format", () => {
  expect(validateEmail("usergmail.com")).toBe(false);
});

// if string is empty
test("empty email", () => {
  expect(validateEmail("")).toBe(false);
});

test("multiple @", () => {
  expect(validateEmail("a@@gmail.com")).toBe(false);
});

// typo error / detection
const getDidYouMean = require("../src/typeError");
test("detect gmial typo", () => {
  const suggestion = getDidYouMean("user@gmial.com");
  expect(suggestion).toBe("user@gmail.com");
});
