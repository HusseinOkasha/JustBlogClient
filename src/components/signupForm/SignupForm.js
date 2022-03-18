import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import "./SignupForm.css";

function SignupForm(props) {
  // Refs :
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  // ------------------------------------------------------------------------------------------

  // Handlers :
  let onSubmitHandler = async function (event) {
    event.preventDefault();

    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };
    await props.signupHandler(data);
  };

  let firstNameOnchangeHandler = function (event) {
    props.onChangeHandlers.firstName(firstNameRef.current.value);
  };

  let lastNameOnchangeHandler = function (event) {
    props.onChangeHandlers.lastName(lastNameRef.current.value);
  };

  let emailOnchangeHandler = function (event) {
    props.onChangeHandlers.email(emailRef.current.value);
  };

  let passwordOnchangeHandler = function (event) {
    props.onChangeHandlers.password(passwordRef.current.value);
  };

  let confirmPasswordOnchangeHandler = function (event) {
    props.onChangeHandlers.confirmPassword(
      confirmPasswordRef.current.value,
      passwordRef.current.value
    );
  };
  // ------------------------------------------------------------------------------------------

  return (
    <div className="signupStyle">
      {props.feedback.successedMessage}
      {props.feedback.failedMessage}
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            ref={firstNameRef}
            onChange={firstNameOnchangeHandler}
          />
          {props.feedback.firstName}
        </Form.Group>

        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            ref={lastNameRef}
            onChange={lastNameOnchangeHandler}
          />
          {props.feedback.lastName}
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            ref={emailRef}
            onChange={emailOnchangeHandler}
          />
          {props.feedback.email}
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            ref={passwordRef}
            onChange={passwordOnchangeHandler}
          />
          {props.feedback.password}
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter your password "
            ref={confirmPasswordRef}
            onChange={confirmPasswordOnchangeHandler}
          />
          {props.feedback.confirmPassword}
        </Form.Group>
        <Button type="submit">Signup</Button>
      </Form>
    </div>
  );
}
export default SignupForm;
