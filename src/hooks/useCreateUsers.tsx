import * as Yup from "yup";
import { useFormik } from "formik";
import { useCreateUsers } from "../services/createUsers.service";
import { IUsersRequest } from "../interfaces";

const validationSchema = Yup.object({
  NombreUsuario: Yup.string().required("Nombre de usuario requerido"),
  Nombre: Yup.string().required("Nombre requerido"),
  Apellido: Yup.string().required("Apellido requerido"),
  Correo: Yup.string().email("Correo invalido").required("Correo requerido"),
  Password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial."
    )
    .required("La contraseña es obligatoria"),
  RolID: Yup.number().required("Rol requerido"),
});

const useCreateUsersHook = () => {
  const {
    mutate: mutateCreateUsers,
    data: dataCreatedUsers,
    isSuccess: isSuccessCreateUsers,
    isLoading,
  } = useCreateUsers();

  const initialValues: IUsersRequest = {
    NombreUsuario: "",
    Nombre: "",
    SNombre: "",
    Apellido: "",
    SApellido: "",
    Correo: "",
    Password: "",
    RolID: 0,
  };

  const handleSubmit = (value: IUsersRequest) => {
    const dataMutateCreate: IUsersRequest = {
      NombreUsuario: value.NombreUsuario,
      Nombre: value.Nombre,
      SNombre: value.SNombre,
      Apellido: value.Apellido,
      SApellido: value.SApellido,
      Correo: value.Correo,
      Password: value.Password,
      RolID: value.RolID,
    };

    mutateCreateUsers(dataMutateCreate);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: IUsersRequest) => {
      handleSubmit(values);
    },
  });

  return {
    formik,
    dataCreatedUsers,
    isSuccessCreateUsers,
    isLoading,
  };
};

export default useCreateUsersHook;
