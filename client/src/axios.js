import axios from "axios";

const BASE_URL = "https://social-mern-back.onrender.com/server/";

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export default publicRequest;