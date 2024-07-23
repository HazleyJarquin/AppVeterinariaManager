import { useMutation } from "react-query";
import { API_BASE_URL, axiosTokenInterceptor } from "../shared/apiConfig";
import { IClientsRequest } from "../interfaces";

const postClients = async (data: IClientsRequest) => {
  const response = await axiosTokenInterceptor(`${API_BASE_URL}/clientes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
  return response;
};

export const useCreateClients = () => {
  return useMutation("createClients", async (requestData: IClientsRequest) => {
    return postClients(requestData);
  });
};
