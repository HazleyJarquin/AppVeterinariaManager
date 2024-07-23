import { useMemo } from "react";
import { Button } from "@chakra-ui/react";
import { IAppointmentsResponse } from "../../../interfaces";

interface Props {
  appointmentData: any;
  refetchData: () => void;
  deactivateAppointmentMutate: (id: number) => void;
  formatearFecha: (fechaCompleta: string) => string;
}

const useTableConfig = ({
  appointmentData,
  deactivateAppointmentMutate,
  refetchData,
  formatearFecha,
}: Props) => {
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

  const columnsWithoutActions = [
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

  const dataCompleted = useMemo(
    () =>
      appointmentData
        ?.filter(
          (appointment: IAppointmentsResponse) => appointment.Activa === 0
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

  return { data, dataCompleted, columns, columnsWithoutActions };
};

export default useTableConfig;
