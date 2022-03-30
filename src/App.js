import "./App.css";
import SignupPage from "./pages/signup/signupPage";
import LoginPage from "./pages/login/LoginPage";
import FeedPage from "./pages/feed/Feed";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Logout from "./components/logout/Logout";
import NewPostPage from "./pages/newPost/newPostPage";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<FeedPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/new-post" element={<NewPostPage />} />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
