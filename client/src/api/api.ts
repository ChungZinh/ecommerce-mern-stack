import { useSelector } from "react-redux";
import { BASE_URL } from "../constants";
import { RootState } from "../redux/store";

interface Credentials {
  email: string;
  password: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  mobile: string;
  address: string;
  dateOfBirth: string;
  avatar: string;
  email: string;
}

interface Product {
  name: string;
  stock: number;
  description: string;
  regu_price: number;
  prom_price: number;
  currency: string;
  tax: number;
  width: number;
  height: number;
  weight: number;
  shipping_fee: number;
  category: string;
  tag: string;
  image: string;
  isDraft: boolean;
  isPublished: boolean;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  parentCategory: string;
  description: string;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode?: number;
}

interface SignInResponse {
  token: string;
}
interface SignUpResponse {
  // No additional data needed if not used
  data: any;
}

interface LogoutResponse {
  message: string;
}

interface UpdateUser {
  data: any;
}

const getAuthToken = (): string | null => {
  return localStorage.getItem("token"); // Assume token is stored in localStorage
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  const data: T = await response.json();
  if (!response.ok) {
    const error = new Error(
      (data as ApiResponse<T>).message || response.statusText || "Unknown error"
    );
    throw error;
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
  logout: (userId: string) =>
    request<LogoutResponse>("/auth/logout", {
      method: "POST",
      headers: {
        "x-client-id": userId,
      },
    }),
  updateUser: (formData: FormData, userId: string): Promise<UpdateUser> =>
    request<UpdateUser>(`/user/${userId}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "x-client-id": userId,
      },
    }),
  createCategory: (
    formData: Category,
    userId: string
  ): Promise<ApiResponse<Category>> =>
    request<ApiResponse<Category>>(`/category`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "x-client-id": userId,
      },
    }),

  getListCategory: (query: string): Promise<ApiResponse<Category[]>> =>
    request<ApiResponse<Category[]>>(`/category${query}`, {
      method: "GET",
    }),
  createProduct: (
    formData: Product,
    userId: string
  ): Promise<ApiResponse<Product>> =>
    request<ApiResponse<Product>>(`/product`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "x-client-id": userId,
      },
    }),

  updateProduct: (
    formData: Product,
    userId: string
  ): Promise<ApiResponse<Product>> =>
    request<ApiResponse<Product>>(`/product/${formData._id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "x-client-id": userId,
      },
    }),

  getProductsList: (query: string): Promise<ApiResponse<Product[]>> =>
    request<ApiResponse<Product[]>>(`/product${query}`, {
      method: "GET",
    }),

  moveToDraft: (
    userId: string,
    productId: string
  ): Promise<ApiResponse<Product>> =>
    request<ApiResponse<Product>>(`/product/move-to-draft/${productId}`, {
      method: "PUT",
      headers: {
        "x-client-id": userId,
      },
    }),

  publishProduct: (
    userId: string,
    productId: string
  ): Promise<ApiResponse<Product>> =>
    request<ApiResponse<Product>>(`/product/publish-product/${productId}`, {
      method: "PUT",
      headers: {
        "x-client-id": userId,
      },
    }),

  updateCategory: (
    userId: string,
    categoryId: string,
    formData: Category
  ): Promise<ApiResponse<Category>> =>
    request<ApiResponse<Category>>(`/category/${categoryId}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "x-client-id": userId,
      },
    }),

  deleteCategory: (
    userId: string,
    categoryId: string
  ): Promise<ApiResponse<Category>> =>
    request<ApiResponse<Category>>(`/category/${categoryId}`, {
      method: "DELETE",
      headers: {
        "x-client-id": userId,
      },
    }),
};
