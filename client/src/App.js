import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import { AuthContext } from "./context/AuthContextProvider";
import { useContext } from "react";
import Messenger from "./pages/messenger/Messenger";


function App() {

  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />}/>
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/messenger" element={!user ? <Navigate to="/" /> : <Messenger />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
