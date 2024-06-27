import { useMemo } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { DataTable } from "../../components/DataTable";
import { IAppointmentsResponse } from "../../interfaces";
import { useGetAppointmentList } from "../../services/getAppointments.service";
import { useGetVetCatalog } from "../../services/getVetCatalog.service";
import { Modal } from "../../components/Modal";
import { CreateAppointmentsForm } from "./components/CreateAppointmentsForm";
import useCreateAppointmentsHook from "../../hooks/useCreateAppointmentsHook";

export const Appointments = () => {
  const { formik } = useCreateAppointmentsHook();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatearFecha = (fechaCompleta: string) => {
    const fecha = new Date(fechaCompleta);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    return `${dia < 10 ? "0" + dia : dia}/${
      mes < 10 ? "0" + mes : mes
    }/${anio}`;
  };

  const {
    data: appointmentData,
    isLoading,
    refetch: refetchData,
  } = useGetAppointmentList();
  const { data: vetCatalogData } = useGetVetCatalog();

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Dueño",
        accessor: "duenho",
      },
      {
        Header: "Motivo",
        accessor: "motivo",
      },
      {
        Header: "Mascota",
        accessor: "mascota",
      },
      {
        Header: "Raza/Especie",
        accessor: "razaespecie",
      },
      {
        Header: "Mascota F. Nacimiento",
        accessor: "mfecnac",
      },
      {
        Header: "Tel. Dueño",
        accessor: "telduenho",
      },
      {
        Header: "Veterinario",
        accessor: "veterinario",
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      appointmentData?.map((appointment: IAppointmentsResponse) => ({
        id: appointment.CitasID,
        duenho: appointment.Cliente.NombreDueño,
        motivo: appointment.Motivo,
        mascota: appointment.Mascota.Nombre,
        razaespecie: `${appointment.Mascota.Raza} - ${appointment.Mascota.Especie}`,
        mfecnac: formatearFecha(appointment.Mascota.FechaNacimiento),
        telduenho: appointment.Cliente.TelDueño,
        veterinario: `Dr(a). ${appointment.Veterinario.NombreVeterinario}`,
      })),
    [appointmentData]
  );

  return (
    <Box
      w={"100%"}
      h={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Modal
        modalTitle="Agregar Cita"
        isOpen={isOpen}
        onClose={onClose}
        children={
          <CreateAppointmentsForm
            onclose={onClose}
            refetchData={refetchData}
            dataVeterinarios={vetCatalogData}
            formik={formik}
          />
        }
      />
      <DataTable
        onClickButtonAdd={onOpen}
        tableTitle="Citas"
        columns={columns}
        data={data}
        loading={isLoading}
        pageSize={5}
        paginated
        paginatedPosition="center"
      />
    </Box>
  );
};
