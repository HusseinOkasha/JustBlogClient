import react from "react";
import { Navigate } from "react-router-dom";
const Logout = (props) => {
  localStorage.removeItem("token");

  return <Navigate to="/login" />;
};

export default Logout;
