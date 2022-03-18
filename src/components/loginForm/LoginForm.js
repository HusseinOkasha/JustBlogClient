import { React, useRef } from "react";
import { Button, Form } from "react-bootstrap";

function LoginForm(props) {
  //Refs
  let emailRef = useRef();
  let passwordRef = useRef();

  //Handlers
  let onSubmitHandler = async function (event) {
    event.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    props.loginHandler(data);
  };

  return (
    <div className="signupStyle">
      {props.feedback}
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter email" ref={emailRef} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            ref={passwordRef}
          />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
}
export default LoginForm;
