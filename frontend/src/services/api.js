import axios from "axios";

const API = axios.create({
  baseURL: "https://apmobility.onrender.com/api/tasks",
});

export default API;