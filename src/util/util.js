export const isValidEmail = function (email) {
  try {
    const temp = Array.from(email);

    const dotIndex = temp.lastIndexOf(".");
    const atIndex = temp.findIndex((elem) => elem === "@");

    const elementsBeforeAt = !(atIndex === 0);
    const elementsAfterAt = !(atIndex + 1 === dotIndex);
    const elementsAfterDot = !(dotIndex === temp.length - 1);
    const isDotAfterAt = dotIndex > atIndex;

    return (
      elementsBeforeAt && elementsAfterAt && elementsAfterDot && isDotAfterAt
    );
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const isValidPassword = function (password) {
  /*
        Rules:
        1) More Than 7 characters.
        2) At least 1  lower case character.
        3) At least 1 upper case character.
        4) At least 1 special character like $, @ (non aplhanumeric)
        5) At least 1 digit
    */
  try {
    const temp = Array.from(password);

    const hasOneLowerCase = temp.find(
      (elem) => elem.charCodeAt(0) > 96 && elem.charCodeAt(0) < 123
    );
    const hasOneUpperCase = temp.find(
      (elem) => elem.charCodeAt(0) > 64 && elem.charCodeAt(0) < 91
    );
    const hasOnedigit = temp.find(
      (elem) => elem.charCodeAt(0) > 47 && elem.charCodeAt(0) < 58
    );
    const hasOneSpecial = temp.find(
      (elem) =>
        !(elem.charCodeAt(0) > 96 && elem.charCodeAt(0) < 123) &&
        !(elem.charCodeAt(0) > 64 && elem.charCodeAt(0) < 91) &&
        !(elem.charCodeAt(0) > 47 && elem.charCodeAt(0) < 58)
    );

    return (
      hasOneLowerCase &&
      hasOneUpperCase &&
      hasOneSpecial &&
      hasOnedigit &&
      temp.length > 7
    );
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const signupValidation = function (data) {
  try {
    const validFN = data.firstName && data.firstName.length > 0 ? true : false;
    const validLN = data.lastName && data.lastName.length > 0 ? true : false;
    const validEmail = isValidEmail(data.email);
    const validPassword =
      isValidPassword(data.password) && data.password === data.confirmPassword;
    console.log(
      "is password: ",
      data.password,
      " valid password:",
      validPassword
    );

    return validFN && validLN && validEmail && validPassword;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const sendRequest = async function (options) {
  const abortController = new AbortController();
  const timeout = 8000;
  const timeoutID = setTimeout(() => abortController.abort(), timeout);

  const updatedOptions = {
    ...options,
    signal: abortController.signal,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  let response = await fetch(
    "https://just-blog1.herokuapp.com/graphql",
    updatedOptions
  );
  clearTimeout(timeoutID);
  return response;
};
