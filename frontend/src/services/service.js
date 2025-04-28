import axios from "axios";

const service = axios.create({
  // baseURL: "http://localhost:3000/api/v1",
  baseURL: "https://expense-tracker-oyua.onrender.com/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    authorization: localStorage.getItem("token") || null,
  },
});

export default service;
