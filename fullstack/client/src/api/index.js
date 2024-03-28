import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// auth routes --------------------------------------------
export const signup=(data)=>API.post("/auth/signup", data);
export const login=(data)=>API.post("/auth/login", data);


// payment routes --------------------------------------------

export const payment=(data)=>API.post("/api/payment", data);
export const verifyPayment=(data)=>API.post("/api/payment/verify", data);