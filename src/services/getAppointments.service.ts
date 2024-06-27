import { useQuery } from "react-query";
import { API_BASE_URL, axiosTokenInterceptor } from "../shared/apiConfig";

const getAppointments = async () => {
  const response = await axiosTokenInterceptor(`${API_BASE_URL}/Citas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const useGetAppointmentList = () => {
  return useQuery(["getAppointments"], {
    // keepPreviousData: true,
    async queryFn() {
      return getAppointments();
    },
  });
};
