import { useMutation } from "react-query";
import { API_BASE_URL, axiosTokenInterceptor } from "../shared/apiConfig";

const deactivateAppointment = async (citaID: number) => {
  const response = await axiosTokenInterceptor(
    `${API_BASE_URL}/DesactivarCita?CitaID=${citaID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const useDeactivateAppointment = () => {
  return useMutation(deactivateAppointment);
};
