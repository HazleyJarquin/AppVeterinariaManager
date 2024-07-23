import { useMutation } from "react-query";
import { API_BASE_URL, axiosTokenInterceptor } from "../shared/apiConfig";
import { IUsersRequest } from "../interfaces";

const postUsers = async (data: IUsersRequest) => {
  const response = await axiosTokenInterceptor(`${API_BASE_URL}/usuario/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
  return response;
};

export const useCreateUsers = () => {
  return useMutation("createUsers", async (requestData: IUsersRequest) => {
    return postUsers(requestData);
  });
};
