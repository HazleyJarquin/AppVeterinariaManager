import { useMutation } from "react-query";
import axios from "axios";
import { API_BASE_URL } from "../shared/apiConfig";
import { ILoginRequest } from "../interfaces";

const authLogin = async (values: ILoginRequest) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, values, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const useLoginMutation = () => {
  return useMutation(authLogin);
};
