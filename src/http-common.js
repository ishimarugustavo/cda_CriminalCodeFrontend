import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:5001/api",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
});