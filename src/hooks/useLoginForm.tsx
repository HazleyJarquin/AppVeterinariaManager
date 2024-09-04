import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from "../services/authLogin.service";
import { ILoginRequest } from "../interfaces";

export const useLoginForm = () => {
  const {
    mutate: login,
    isLoading,
    isError,
    error,
    data,
    isSuccess,
  } = useLoginMutation();

  const initialValues: ILoginRequest = {
    Correo: "",
    Password: "",
  };

  const handleSubmit = (values: ILoginRequest) => {
    const loginData = {
      Correo: values.Correo,
      Password: values.Password,
    };

    login(loginData);
  };

  const formik = useFormik<ILoginRequest>({
    initialValues: initialValues,
    validationSchema: Yup.object({
      Correo: Yup.string().email("Correo Invalido").required("Requerido"),
      Password: Yup.string().required("Requerido"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return { formik, isLoading, isError, error, data, isSuccess };
};
