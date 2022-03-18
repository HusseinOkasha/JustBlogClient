import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import NewPostForm from "../../components/newPost/NewPostForm";
import { sendRequest } from "../../util/util";
const NewPostPage = (props) => {
  // States
  let [showFeedback, setShowFeedback] = useState(false);
  let [failed, setFailed] = useState(false);

  // Handlers
  const newPostHandler = async (data) => {
    const queryString = {
      query: `mutation{
            createPost(body:"${data.body}"){
              body
            }
          }`,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(queryString),
    };
    let response = await sendRequest(options);
    setShowFeedback(true);
    if (!response.ok) {
      setFailed(true);
    } else {
      setFailed(false);
    }
  };

  // feedbacks
  const success =
    showFeedback && !failed ? (
      <Alert variant="success"> New Post Created Successfully! </Alert>
    ) : null;
  const failure =
    showFeedback && failed ? (
      <Alert variant="danger"> Creating new post failed </Alert>
    ) : null;
  const feedback = {
    success: success,
    failure: failure,
  };
  return (
    <div>
      <NewPostForm newPostHandler={newPostHandler} feedback={feedback} />
    </div>
  );
};

export default NewPostPage;
