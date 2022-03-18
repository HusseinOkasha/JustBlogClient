import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";

const NewPost = (props) => {
  //Refs
  const bodyRef = useRef();

  //Handlers
  let onSubmitHandler = (event) => {
    event.preventDefault();
    let data = { body: bodyRef.current.value };
    props.newPostHandler(data);
  };

  return (
    <div className="signupStyle">
      {props.feedback.success}
      {props.feedback.failure}
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="new-post">
          <Form.Label>Body</Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            placeholder="Just write!"
            ref={bodyRef}
          />
        </Form.Group>

        <Button type="submit">Post</Button>
      </Form>
    </div>
  );
};
export default NewPost;
