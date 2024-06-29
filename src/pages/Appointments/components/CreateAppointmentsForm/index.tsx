import { Box, Button, FormLabel, Input, Select } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { IAppointmentsRequest } from "../../../../interfaces/IAppointmentsRequest.interface";

import { ChangeEvent } from "react";
import { ICatalogPet, ICatalogVet } from "../../../../interfaces";

interface Props {
  formik: FormikProps<IAppointmentsRequest>;
  petCatalogData: ICatalogPet[];
  dataVeterinarios: ICatalogVet[];
  refetchData: () => void;
  onclose: () => void;
  isLoading: boolean;
}
export const CreateAppointmentsForm = ({
  formik,
  petCatalogData,
  refetchData,
  dataVeterinarios,
  onclose,
  isLoading,
}: Props) => {
  const handleVeterinarioChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedVeterinarioID = event.target.value;
    formik.setFieldValue("VeterinarioID", selectedVeterinarioID);
  };
  const handleMascotaChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedMascotaID = event.target.value;
    formik.setFieldValue("MascotaID", selectedMascotaID);
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
      <Select placeholder="Seleccion su mascota" onChange={handleMascotaChange}>
        {petCatalogData?.map((mascota: ICatalogPet) => {
          return (
            <option key={mascota.MascotaID} value={mascota.MascotaID}>
              {mascota.NombreMascota}
            </option>
          );
        })}
      </Select>

      <Button
        mt={4}
        background={"#35b68f"}
        color={"white"}
        _hover={{ background: "#e1403f" }}
        isLoading={isLoading}
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
