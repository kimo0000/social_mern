// import axios from 'axios';
import publicRequest from "./axios"; // ou "../axios"

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await publicRequest.post("auth/login", userCredential);
    console.log(res.data, "from ApiCalls");
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};