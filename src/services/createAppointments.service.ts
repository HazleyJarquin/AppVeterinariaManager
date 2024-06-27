import { useMutation } from "react-query";
import { API_BASE_URL, axiosTokenInterceptor } from "../shared/apiConfig";
import { IAppointmentsRequest } from "../interfaces/IAppointmentsRequest.interface";

const postAppointments = async (data: IAppointmentsRequest) => {
  const response = await axiosTokenInterceptor(`${API_BASE_URL}/Citas/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
  return response;
};

export const useCreateAppointments = () => {
  return useMutation(
    "createAppointments",
    async (requestData: IAppointmentsRequest) => {
      return postAppointments(requestData);
    }
  );
};
