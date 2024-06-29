import { useQuery } from "react-query";
import { API_BASE_URL, axiosTokenInterceptor } from "../shared/apiConfig";

const getPetCatalog = async () => {
  const response = await axiosTokenInterceptor(
    `${API_BASE_URL}/MascotaCatalogo`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const useGetPetCatalog = () => {
  return useQuery(["getPetCatalogs"], () => getPetCatalog(), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    onSuccess: (data) => {
      console.log("New data fetched:", data);
    },
    // Puedes utilizar 'refetchInterval' si deseas actualizar los datos periódicamente
    // refetchInterval: 1000 * 60, // 1 minute
  });
};
