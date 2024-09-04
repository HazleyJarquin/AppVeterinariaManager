import * as yup from "yup";
import { useFormik } from "formik";
import { IClientsRequest } from "../interfaces";
import { useCreateClients } from "../services/createClients.service";

const validationSchema = yup.object({
  Nombre: yup.string().required("Nombre es requerido"),
  Apellido: yup.string().required("Apellido es requerido"),
  Direccion: yup.string().required("Direccion es requerido"),
  Correo: yup
    .string()
    .email("Ingrese un correo valido")
    .required("Correo es requerido"),
  Telefono: yup.string().required("Telefono es requerido"),
});

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
    validationSchema: validationSchema,
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
