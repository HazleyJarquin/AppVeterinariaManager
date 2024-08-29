import * as Yup from "yup";
import { useFormik } from "formik";
import { useCreateAppointments } from "../services/createAppointments.service";
import { IAppointmentsRequest } from "../interfaces/IAppointmentsRequest.interface";

const validationSchema = Yup.object({
  FechaHora: Yup.string().required("La fecha es requerida"),
  Motivo: Yup.string().required("El motivo es requerido"),
  MascotaID: Yup.number().required("La mascota es requerida"),
  VeterinarioID: Yup.number().required("El veterinario es requerido"),
});

const useCreateAppointmentsHook = () => {
  const {
    mutate: mutateCreateAppointments,
    data: dataCreatedAppointments,
    isLoading,
  } = useCreateAppointments();

  const initialValues: IAppointmentsRequest = {
    FechaHora: "",
    Motivo: "",
    MascotaID: 0,
    VeterinarioID: 0,
  };

  const handleSubmit = (value: IAppointmentsRequest) => {
    const dataMutateCreate: IAppointmentsRequest = {
      FechaHora: value.FechaHora,
      Motivo: value.Motivo,
      MascotaID: value.MascotaID,
      VeterinarioID: value.VeterinarioID,
    };

    mutateCreateAppointments(dataMutateCreate);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values: IAppointmentsRequest) => {
      handleSubmit(values);
    },
  });

  return {
    formik,
    dataCreatedAppointments,
    isLoading,
  };
};

export default useCreateAppointmentsHook;
