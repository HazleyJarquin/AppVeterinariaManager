import * as yup from "yup";
import { useFormik } from "formik";
import { IClientsRequest } from "../interfaces";
import { useCreateClients } from "../services/createClients.service";

const validationSchema = yup.object({
  Nombre: yup
    .string()
    .required("El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(30, "El nombre no puede tener más de 30 caracteres")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
      "El nombre solo puede contener letras y espacios"
    ),

  Apellido: yup
    .string()
    .required("El apellido es requerido")
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(30, "El apellido no puede tener más de 30 caracteres")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
      "El apellido solo puede contener letras y espacios"
    ),
  Direccion: yup.string().required("Direccion es requerido"),
  Correo: yup
    .string()
    .email("Ingrese un correo valido")
    .required("Correo es requerido"),
  Telefono: yup
    .number()
    .typeError("El teléfono debe ser un número")
    .required("Teléfono es requerido"),
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
