import { useMemo } from "react";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { DataTable } from "../../components/DataTable";
import { IAppointmentsResponse } from "../../interfaces";
import { useGetAppointmentList } from "../../services/getAppointments.service";

import { Modal } from "../../components/Modal";
import { CreateAppointmentsForm } from "./components/CreateAppointmentsForm";
import useCreateAppointmentsHook from "../../hooks/useCreateAppointmentsHook";
import { useGetVetCatalog } from "../../services/getVetCatalog.service";
import { useGetPetCatalog } from "../../services/getPetCatalog.service";
import { useDeactivateAppointment } from "../../services/deactivateAppointment.service";

export const Appointments = () => {
  const { formik, isLoading } = useCreateAppointmentsHook();
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

    refetch: refetchData,
  } = useGetAppointmentList();
  const { data: vetCatalogData } = useGetVetCatalog();
  const { data: petDataCatalog } = useGetPetCatalog();
  const { mutate: deactivateAppointmentMutate } = useDeactivateAppointment();

  const columns = [
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
    {
      Header: "Acciones",
      accessor: "actions",
      id: "actions",
      Cell: ({ row }: { row: any }) => (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <Button
            backgroundColor={"red"}
            color={"white"}
            _hover={{ background: "#e1403f" }}
            onClick={() => {
              deactivateAppointmentMutate(row.original.id);
              setTimeout(() => {
                refetchData();
              }, 500);
            }}
          >
            Marcar Completada
          </Button>
        </div>
      ),
    },
  ];

  const data = useMemo(
    () =>
      appointmentData
        ?.filter(
          (appointment: IAppointmentsResponse) => appointment.Activa === 1
        )
        .map((appointment: IAppointmentsResponse) => ({
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
            isLoading={isLoading}
            petCatalogData={petDataCatalog}
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
