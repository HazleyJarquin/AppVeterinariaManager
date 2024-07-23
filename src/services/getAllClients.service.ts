import { useQuery } from "react-query";
import { API_BASE_URL, axiosTokenInterceptor } from "../shared/apiConfig";

const getClientList = async () => {
  const response = await axiosTokenInterceptor(`${API_BASE_URL}/clientes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const useGetClientList = () => {
  return useQuery(["getClientList"], {
    async queryFn() {
      return getClientList();
    },
  });
};
