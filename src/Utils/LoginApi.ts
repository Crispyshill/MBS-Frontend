import { User } from '../Types/User';
import { Activity } from '../Types/Activity';
import { Post } from '../Types/Post';
import { Challenge } from '../Types/Challenge';



const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
console.log("Backend Url: " + BACKEND_URL)





export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  console.log("loginApi called")
  
  if (!BACKEND_URL) {
    console.log("Backend url is not defined")
    throw new Error(`Environment variable ${BACKEND_URL} is not defined`);
  }
  if (!process.env.REACT_APP_LOGIN_ENDPOINT) {
    console.log("login endpoint is not defined")
    throw new Error(`Environment variable ${process.env.REACT_APP_LOGIN_ENDPOINT} is not defined`);
  }
  const login_url: string = BACKEND_URL + process.env.REACT_APP_LOGIN_ENDPOINT
  console.log("login url: " + login_url)
  const response = await fetch(login_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }
  return response.json();
}
