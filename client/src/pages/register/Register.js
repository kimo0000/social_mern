import { useState } from "react";
import "./register.css";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useRef } from "react";
// import publicRequest from "publicRequest";
import { useNavigate } from "react-router-dom";

import publicRequest from "../../axios";


export default function Register() {
  const navigate = useNavigate();

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to toggle password visibility
  const showHidePassword = (e) => setShowPassword(!showPassword);
  // Function to toggle confirm password visibility
  const showHideConfirmPassword = (e) => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
      if(passwordRef.current.value !== confirmPasswordRef.current.value) {
        confirmPasswordRef.current.setCustomValidity("Passwords do not match");
      } else {
        const user = {
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,    
        };
      
        try {
          // publicRequest.post("/auth/register", user);
          await publicRequest.post("auth/register", user);
          navigate("/login");
        } catch(err) {
          console.error("Registration failed:", err);
        }
      }
    };


  return (
    <section className="register">
      <div className="title_app">
        <h1 className="title">Social App</h1>
        <p>Connect With friends and the world around you on Social App.</p>
      </div>
      <div className="register_wrapper">
        <h4>Register</h4>
        <form action="" onSubmit={handleSubmit}>
          <div className="username">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="username"
              name="first username"
              ref={usernameRef}
              required
              autoComplete="username"
              autoFocus
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="email"
              name="email"
              ref={emailRef}
              required
              autoComplete="username"
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
              autoComplete="username"
              autoFocus
              minLength={6}
            />
            {showPassword ? (
              <FaEye className="show_pass" onClick={showHidePassword} />
            ) : (
              <FaEyeSlash className="hide_pass" onClick={showHidePassword} />
            )}
          </div>
          <div className="confrim_password">
            <label htmlFor="confrim_password">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confrim_password"
              placeholder="confrim_password"
              name="confrim_password"
              ref={confirmPasswordRef}
              required
              autoComplete="username"
              autoFocus
            />
            {showConfirmPassword ? (
              <FaEye className="show_pass" onClick={showHideConfirmPassword} />
            ) : (
              <FaEyeSlash
                className="hide_pass"
                onClick={showHideConfirmPassword}
              />
            )}
          </div>
          <button type="submit" className="register_btn">
            Register
          </button>
        </form>
        <p className="register_text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </section>
  );
}
