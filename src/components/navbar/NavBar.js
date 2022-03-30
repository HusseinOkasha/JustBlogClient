import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavBar(props) {
  const home = props.home ? (
    <Link className="nav-link" to="/">
      Home
    </Link>
  ) : null;

  const new_post = props.new_post ? (
    <Link className="nav-link" to="/new-post">
      New Post
    </Link>
  ) : null;
  const login = props.signup ? (
    <Link className="nav-link  " to="/signup">
      Signup
    </Link>
  ) : null;
  const signup = props.login ? (
    <Link className="nav-link" to="/login">
      Login
    </Link>
  ) : null;
  const logout = props.logout ? (
    <Link className="nav-link" to="/logout">
      Logout
    </Link>
  ) : null;

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Nav className="me-auto">
          <Navbar.Brand href="#">JustBlog</Navbar.Brand>
          {home}
          {new_post}
        </Nav>
        <Nav className="ms-auto">
          {signup}
          {login}
          {logout}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
