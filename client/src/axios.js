import axios from "axios";

const BASE_URL = "https://social-mern-backend-c0xt.onrender.com/api/";

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export default publicRequest;