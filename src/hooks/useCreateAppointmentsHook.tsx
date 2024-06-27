import { useFormik } from "formik";
import { useCreateAppointments } from "../services/createAppointments.service";
import { IAppointmentsRequest } from "../interfaces/IAppointmentsRequest.interface";

const useCreateAppointmentsHook = () => {
  const { mutate: mutateCreateAppointments, data: dataCreatedAppointments } =
    useCreateAppointments();

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
    onSubmit: (values: IAppointmentsRequest) => {
      handleSubmit(values);
    },
  });

  return {
    formik,
    dataCreatedAppointments,
  };
};

export default useCreateAppointmentsHook;
