import { Box, Button, FormLabel, Input, Select } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { IAppointmentsRequest } from "../../../../interfaces/IAppointmentsRequest.interface";

import { ChangeEvent } from "react";
import { ICatalogVet } from "../../../../interfaces";

interface Props {
  formik: FormikProps<IAppointmentsRequest>;

  dataVeterinarios: ICatalogVet[];
  refetchData: () => void;
  onclose: () => void;
}
export const CreateAppointmentsForm = ({
  formik,

  refetchData,
  dataVeterinarios,
  onclose,
}: Props) => {
  const handleVeterinarioChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedVeterinarioID = event.target.value;
    formik.setFieldValue("VeterinarioID", selectedVeterinarioID);
  };

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <FormLabel>Veterinario</FormLabel>
      <Select placeholder="Veterinarios" onChange={handleVeterinarioChange}>
        {dataVeterinarios?.map((veterinario: ICatalogVet) => {
          return (
            <option
              key={veterinario.VeterinarioID}
              value={veterinario.VeterinarioID}
            >
              {veterinario.VeterinarioNombre}
            </option>
          );
        })}
      </Select>
      <FormLabel>Motivo</FormLabel>
      <Input
        placeholder="Motivo"
        value={formik.values.Motivo}
        onChange={formik.handleChange}
        name="Motivo"
      />
      <FormLabel>Fecha y Hora</FormLabel>
      <Input
        type="datetime-local"
        value={formik.values.FechaHora}
        onChange={formik.handleChange}
        name="FechaHora"
      />
      <FormLabel>Mascota ID</FormLabel>
      <Input
        placeholder="Mascota ID"
        value={formik.values.MascotaID}
        onChange={formik.handleChange}
        name="MascotaID"
      />
      <Button
        mt={4}
        onClick={() => {
          formik.handleSubmit();
          setTimeout(() => {
            refetchData();
            onclose();
            formik.resetForm();
          }, 1000);
        }}
      >
        Guardar
      </Button>
    </Box>
  );
};
