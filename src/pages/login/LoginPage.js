import { React, useState } from "react";
import { Navigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import LoginForm from "../../components/loginForm/LoginForm";
import Navbar from "../../components/navbar/NavBar";
import { sendRequest } from "../../util/util";
function LoginPage(props) {
  // States
  let [authenticated, setAuthenticated] = useState(false);
  let [loginFailedState, setLoginFailedState] = useState(false);

  //Handlers
  let loginHandler = async function (data) {
    const queryString = {
      query: `query{
        login(email:"${data.email}", password:"${data.password}"){
          token
          userId
        }
      }`,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(queryString),
      headers: { "Content-type": "application/json" },
    };
    try {
      let response = await sendRequest(options);
      let token, userID;

      if (!response.ok) {
        setLoginFailedState(true);
      } else {
        response = await response.json();

        token = response.data.login.token;
        //userID = response.data.login.userId;
        localStorage.setItem("token", token);
        setAuthenticated(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  let loginFailedMessage = loginFailedState ? (
    <Alert variant="danger">Login Failed !</Alert>
  ) : null;

  let navigate = authenticated ? <Navigate exact to="/" /> : null;
  return (
    <>
      <Navbar signup={true} />
      <div className="signupStyle">
        {navigate}
        <LoginForm loginHandler={loginHandler} feedback={loginFailedMessage} />
      </div>
    </>
  );
}
export default LoginPage;
