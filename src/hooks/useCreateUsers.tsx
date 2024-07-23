import { useFormik } from "formik";
import { useCreateUsers } from "../services/createUsers.service";
import { IUsersRequest } from "../interfaces";

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
