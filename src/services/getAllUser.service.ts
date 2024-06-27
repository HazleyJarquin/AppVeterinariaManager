import { useQuery } from "react-query";
import { API_BASE_URL, axiosTokenInterceptor } from "../shared/apiConfig";

const getUserList = async () => {
  const response = await axiosTokenInterceptor(`${API_BASE_URL}/Usuario`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
    },
  });
  return response;
};
export const useGetUserList = () => {
  return useQuery(["getUserList"], {
    // keepPreviousData: true,
    async queryFn() {
      return getUserList();
    },
  });
};
