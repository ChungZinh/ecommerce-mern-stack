// api.ts

import { BASE_URL } from "../constants";

interface Credentials {
  email: string;
  password: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  statusText?: string;
}

interface SignInResponse {
  data: any; // Adjust this type according to your actual response structure
  token: string;
}

interface SignUpResponse {
  data: any; // Adjust this type according to your actual response structure
}

const getAuthToken = (): string | null => {
  return localStorage.getItem("token"); // Giả sử token được lưu trữ trong localStorage
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  const data: T = await response.json();
  if (!response.ok) {
    // Xử lý phản hồi không phải 2xx
    const error = (data as ApiResponse<T>).message || response.statusText;
    throw new Error(error);
  }
  return data;
};

const request = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthToken()}`,
    ...options.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(`${BASE_URL}${url}`, config);
  return handleResponse<T>(response);
};

export const api = {
  get: <T>(url: string): Promise<T> => request<T>(url, { method: "GET" }),
  post: <T>(url: string, body: unknown): Promise<T> =>
    request<T>(url, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(url: string, body: unknown): Promise<T> =>
    request<T>(url, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(url: string): Promise<T> => request<T>(url, { method: "DELETE" }),
  signIn: (credentials: Credentials): Promise<SignInResponse> =>
    request<SignInResponse>("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
  signUp: (credentials: Credentials): Promise<SignUpResponse> =>
    request<SignUpResponse>("/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
};
