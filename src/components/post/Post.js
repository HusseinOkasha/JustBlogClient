import React from "react";
import { Container } from "react-bootstrap";
function Post(props) {
  return (
    <div className="card">
      <p>{props.children}</p>
    </div>
  );
}
export default Post;
