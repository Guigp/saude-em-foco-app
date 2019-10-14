import axios from "axios";
const api = axios.create({
  baseURL: "https://fathomless-ocean-81474.herokuapp.com"
});

export default api;
