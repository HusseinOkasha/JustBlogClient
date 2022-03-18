import React, { useEffect, useState } from "react";

import Post from "../../components/post/Post";

import { sendRequest } from "../../util/util";

const FeedPage = function (props) {
  let [state, setState] = useState({
    posts: [],
    loaded: false,
    loading: false,
  });

  const getPosts = async () => {
    const queryString = {
      query: `
        {
         posts
          {
            posts
            {
              body
              id
            }
          }
        
        }  
        `,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(queryString),
    };
    const response = await sendRequest(options);
    const data = await response.json();

    setState({ loaded: true, posts: data?.data?.posts?.posts });
  };

  useEffect(() => getPosts(), []);
  return (
    <div>
      {state.posts?.map((post, idx) => (
        <Post key={idx}>{post.body}</Post>
      ))}
    </div>
  );
};
/*
 */
export default FeedPage;
