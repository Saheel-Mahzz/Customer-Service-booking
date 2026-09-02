import axios, { AxiosError, type AxiosInstance } from "axios";

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

const handleError = (error: AxiosError) => {
  if (error.response) {
    throw new ApiError(
      error.response.statusText || "Request failed",
      error.response.status
    );
  } else if (error.request) {
    throw new ApiError("Network error occurred");
  } else {
    throw new ApiError(error.message || "Unexpected error occurred");
  }
};

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.response.use((response) => response, handleError);

export const staticClient: AxiosInstance = axios.create({
  timeout: 10000,
});
staticClient.interceptors.response.use((response) => response, handleError);

export async function httpGet<T>(url: string): Promise<T> {
  const response = await apiClient.get<T>(url);
  return response.data;
}

export async function httpPost<T>(url: string, body: unknown): Promise<T> {
  const response = await apiClient.post<T>(url, body);
  return response.data;
}