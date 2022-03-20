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
    <div className="formStyle">
      <center>
        <h2>New Post</h2>
      </center>
      {props.feedback.success}
      {props.feedback.failure}
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="new-post">
          <Form.Control
            type="text"
            as="textarea"
            placeholder="Just write!"
            ref={bodyRef}
            size="lg"
          />
        </Form.Group>

        <Button variant="dark" type="submit">
          Post
        </Button>
      </Form>
    </div>
  );
};
export default NewPost;
