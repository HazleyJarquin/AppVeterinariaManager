import { useFormik } from "formik";
import { IClientsRequest } from "../interfaces";
import { useCreateClients } from "../services/createClients.service";

const useCreateClientsHook = () => {
  const {
    mutate: mutateCreateClients,
    data: dataCreatedClients,
    isSuccess: isSuccessCreateClients,
    isLoading,
  } = useCreateClients();

  const initialValues: IClientsRequest = {
    Nombre: "",
    Apellido: "",
    Direccion: "",
    Correo: "",
    Telefono: "",
  };

  const handleSubmit = (value: IClientsRequest) => {
    const dataMutateCreate: IClientsRequest = {
      Nombre: value.Nombre,
      Apellido: value.Apellido,
      Direccion: value.Direccion,
      Correo: value.Correo,
      Telefono: value.Telefono,
    };

    mutateCreateClients(dataMutateCreate);
  };

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values: IClientsRequest) => {
      handleSubmit(values);
    },
  });

  return {
    formik,
    dataCreatedClients,
    isSuccessCreateClients,
    isLoading,
  };
};

export default useCreateClientsHook;
