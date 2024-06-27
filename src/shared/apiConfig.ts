import axios, { AxiosRequestConfig } from "axios";

export const API_BASE_URL = "https://localhost:44330/api";

const tokenInterceptor = async (config: AxiosRequestConfig) => {
  const newConfig = { ...config };
  const token = localStorage.getItem("auth-token");

  if (token) {
    const parsedToken = JSON.parse(token);
    const loginToken = parsedToken.state.token;

    newConfig.headers = {
      ...newConfig.headers,
      Authorization: `Bearer ${loginToken}`,
    };
  }

  return newConfig;
};

export const axiosTokenInterceptor = async (
  url: string,
  config: AxiosRequestConfig = {}
) => {
  const newConfig = await tokenInterceptor(config);

  try {
    const response = await axios(url, newConfig);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
