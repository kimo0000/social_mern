import "./Login.css";
import { FcGoogle } from "react-icons/fc";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useState, useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContextProvider";
// import {bcrypt} from "bcryptjs"; // Assuming bcryptjs is installed for password hashing


export default function Login() {
  // Access the AuthContext to get user, isFetching, and dispatch
  const {isFetching, dispatch } = useContext(AuthContext);
  // Create references for email and password input fields
  const emailRef = useRef();
  const passwordRef = useRef();

  // Function to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const showHidePassword = (e) => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // add validation logic here if needed
      loginCall(
       { email: emailRef.current.value, password: passwordRef.current.value },
       dispatch);
  };


  return (
    <section className="login">
      <div className="title_app">
        <h1 className="title">Social App</h1>
        <p>Connect With friends and the world around you on Social App.</p>
      </div>
      <div className="login_wrapper">
        <h4>Login</h4>
        <form action="" onSubmit={handleSubmit}>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="email"
              name="email"
              ref={emailRef}
              required
              autoComplete="email"
              autoFocus
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="password"
              name="password"
              ref={passwordRef}
              required
              minLength={6}
              maxLength={20}
            />
            {showPassword ? (
              <FaEye className="show_pass" onClick={showHidePassword} />
            ) : (
              <FaEyeSlash className="hide_pass" onClick={showHidePassword} />
            )}
          </div>
          <button type="submit" className="login_btn"
            disabled={isFetching} // Disable button if fetching is in progress
          >
            {isFetching ? "Loading..." : "Login"}
          </button>
          <div className="break">
            <hr className="br" />
            <span className="or">OR</span>
          </div>
          <div className="google_btn">
            <a href="#/" className="google_login">
              <FcGoogle />
              <span>Connect With Your Google Account!</span>
            </a>
          </div>
        </form>
        <p className="forgot_pass">
          <a href="/forgot_password">Forgot Password</a>
        </p>
        <button className="create_account">
          <a href="/register" className="create_new_account">Create New Account</a>
        </button>
      </div>
    </section>
  );
}
