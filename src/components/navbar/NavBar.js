import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavBar(props) {
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="#">JustBlog</Navbar.Brand>
        <Nav className="me-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/new-post">
            New Post
          </Link>
          <Link className="nav-link" to="/signup">
            Signup
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
          <Link className="nav-link" to="/logout">
            Logout
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
