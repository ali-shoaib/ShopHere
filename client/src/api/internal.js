import axios from "axios";
import { FRONTEND_INTERNAL_API_PATH } from "../config/keys";

const api = axios.create({
  baseURL: FRONTEND_INTERNAL_API_PATH,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = async (data) => {
    let response;
  
    try {
      response = await api.post("register", data);
    } catch (error) {
      return error;
    }
  
    return response;
};

export const login = async (data) => {
    let response;
  
    try {
      response = await api.post("login", data);
    } catch (error) {
      return error;
    }
  
    return response;
};

export const logout = async () => {
  let response;

  try {
    response = await api.get("logout");
  } catch (error) {
    return error;
  }

  return response;
};

export const dashboard = async () => {
  let response;

  try {
    response = await api.get("dashboard");
  } catch (error) {
    return error;
  }

  return response;
};