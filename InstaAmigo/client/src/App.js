import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import CreatePost from "./Pages/CreatePost";
import EditPost from "./Pages/EditPost";
import Profile from "./Pages/Profile";
import { UserContextProvider } from "./context/UserContext";
function App() {
  return (
    <UserContextProvider>
      <Routes>
        
          <Route index  element={<LogIn />} />
          <Route path={"/signup"} element={<SignUp />} />
          <Route path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/write"} element={<CreatePost />} />
          <Route exact path="/edit/:id" element={<EditPost />} />
          <Route exact path="/profile/:id" element={<Profile />} />
        
      </Routes>
    </UserContextProvider>
  );
}

export default App;
