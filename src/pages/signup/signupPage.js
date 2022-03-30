import React, { useState } from "react";

import { Alert, Form } from "react-bootstrap";
import SignupForm from "../../components/signupForm/SignupForm";
import { sendRequest } from "../../util/util";
import { isValidEmail, isValidPassword } from "../../util/util";
import Navbar from "../../components/navbar/NavBar";

function SignupPage(props) {
  // States :
  // -------
  let [validationStates, setValidationStates] = useState({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    confirmPassword: true,
  });

  let [showSuccessedState, setShowSuccessedState] = useState(false);
  let [showFailedState, setShowFailedState] = useState({
    show: false,
    message: null,
  });
  // ------------------------------------------------------------------------------------------

  // Error messages :
  let errorMessages = {
    name: "At least 1 character",
    email: "In valid email. Must be like aaa@aa.com",
    password: "At least 8 characters, 1 uppercase, 1 symbol, 1 digit ",
    confirmPassword: "Passwords Don't match",
  };
  // ------------------------------------------------------------------------------------------

  // Handlers :
  let signupHandler = async function (data) {
    let isValid = true;
    for (let key in validationStates) {
      isValid &&= validationStates[key];
    }

    const querystring = {
      query: `mutation{
      createUser(userInput:{email:"${data.email}", password:"${data.password}", firstName:"${data.firstName}", lastName:"${data.lastName}"}){
        firstName
        email
      }
    }`,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(querystring),
      headers: { "Content-type": "application/json" },
      Authorization: localStorage.getItem("token"),
    };
    if (isValid) {
      let response = await sendRequest(options);
      if (response.ok) {
        setShowSuccessedState(true);
        setShowFailedState({ show: false, message: null });
      } else {
        response = await response.json();
        try {
          setShowFailedState({
            show: true,
            message: response.errors[0].message,
          });
          setShowSuccessedState(false);
        } catch (err) {
          setShowFailedState({ show: true, message: "Signup Failed!" });
          setShowSuccessedState(false);
        }
      }
    }
  };

  let firstNameOnchangeHandler = function (firstName) {
    if (firstName.length > 0) {
      setValidationStates({ ...validationStates, firstName: true });
    } else {
      setValidationStates({ ...validationStates, firstName: false });
    }
  };

  let lastNameOnchangeHandler = function (lastName) {
    if (lastName.length > 0) {
      setValidationStates({ ...validationStates, lastName: true });
    } else {
      setValidationStates({ ...validationStates, lastName: false });
    }
  };

  let emailOnchangeHandler = function (email) {
    if (isValidEmail(email)) {
      setValidationStates({ ...validationStates, email: true });
    } else {
      setValidationStates({ ...validationStates, email: false });
    }
  };

  let passwordOnchangeHandler = function (password) {
    if (isValidPassword(password)) {
      setValidationStates({ ...validationStates, password: true });
    } else {
      setValidationStates({ ...validationStates, password: false });
    }
  };

  let confirmPasswordOnchangeHandler = function (confirmPassword, password) {
    if (confirmPassword === password) {
      setValidationStates({ ...validationStates, confirmPassword: true });
    } else {
      setValidationStates({ ...validationStates, confirmPassword: false });
    }
  };

  const onChangeHandlers = {
    firstName: firstNameOnchangeHandler,
    lastName: lastNameOnchangeHandler,
    email: emailOnchangeHandler,
    password: passwordOnchangeHandler,
    confirmPassword: confirmPasswordOnchangeHandler,
  };
  // ------------------------------------------------------------------------------------------

  // Error messages :
  // ---------------
  const firstNameErrorMessage = validationStates.firstName ? null : (
    <Form.Text className="text-danger">{errorMessages.name}</Form.Text>
  );
  const lastNameErrorMessage = validationStates.lastName ? null : (
    <Form.Text className="text-danger">{errorMessages.name}</Form.Text>
  );

  const emailErrorMessage = validationStates.email ? null : (
    <Form.Text className="text-danger">{errorMessages.email}</Form.Text>
  );
  const passwordErrorMessage = validationStates.password ? null : (
    <Form.Text className="text-danger">{errorMessages.password}</Form.Text>
  );
  const confirmPasswordErrorMessage =
    validationStates.confirmPassword ? null : (
      <Form.Text className="text-danger">
        {errorMessages.confirmPassword}
      </Form.Text>
    );
  const successedMessage = showSuccessedState ? (
    <Alert variant="success">Blogger Created Successfuly.!</Alert>
  ) : null;
  const failedMessage = showFailedState.show ? (
    <Alert variant="danger">{showFailedState.message}</Alert>
  ) : null;

  const feedback = {
    firstName: firstNameErrorMessage,
    lastName: lastNameErrorMessage,
    email: emailErrorMessage,
    password: passwordErrorMessage,
    confirmPassword: confirmPasswordErrorMessage,
    successedMessage: successedMessage,
    failedMessage: failedMessage,
  };

  // ------------------------------------------------------------------------------------------

  return (
    <div>
      <Navbar login={true} />
      <SignupForm
        signupHandler={signupHandler}
        onChangeHandlers={onChangeHandlers}
        feedback={feedback}
      />
    </div>
  );
}
export default SignupPage;
