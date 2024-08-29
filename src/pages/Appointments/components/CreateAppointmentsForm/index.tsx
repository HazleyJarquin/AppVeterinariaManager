import { Box, Button, FormLabel, Input, Select } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { IAppointmentsRequest } from "../../../../interfaces/IAppointmentsRequest.interface";

import { ChangeEvent } from "react";
import { ICatalogPet, ICatalogVet } from "../../../../interfaces";
import { WarningIcon } from "../../../../components/WarningIcon";

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
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <FormLabel>Veterinario</FormLabel>
        {formik.errors.VeterinarioID && formik.touched.VeterinarioID ? (
          <WarningIcon message={formik.errors.VeterinarioID} />
        ) : null}
      </Box>

      <Select
        onBlur={(event) => {
          if (event.target instanceof HTMLInputElement) {
            formik.setFieldValue("VeterinarioID", event.target.value);
          }

          formik.handleBlur("VeterinarioID")(event);
        }}
        placeholder="Veterinarios"
        onChange={handleVeterinarioChange}
      >
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
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <FormLabel>Motivo</FormLabel>
        {formik.errors.Motivo && formik.touched.Motivo ? (
          <WarningIcon message={formik.errors.Motivo} />
        ) : null}
      </Box>
      <Input
        placeholder="Motivo"
        value={formik.values.Motivo}
        onChange={formik.handleChange}
        name="Motivo"
        onBlur={(event) => {
          if (event.target instanceof HTMLInputElement) {
            formik.setFieldValue("Motivo", event.target.value);
          }

          formik.handleBlur("Motivo")(event);
        }}
      />

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <FormLabel>Fecha y Hora</FormLabel>
        {formik.errors.FechaHora && formik.touched.FechaHora ? (
          <WarningIcon message={formik.errors.FechaHora} />
        ) : null}
      </Box>
      <Input
        type="datetime-local"
        value={formik.values.FechaHora}
        onChange={formik.handleChange}
        name="FechaHora"
        onBlur={(event) => {
          if (event.target instanceof HTMLInputElement) {
            formik.setFieldValue("FechaHora", event.target.value);
          }

          formik.handleBlur("FechaHora")(event);
        }}
      />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <FormLabel>Mascota ID</FormLabel>
        {formik.errors.MascotaID && formik.touched.MascotaID ? (
          <WarningIcon message={formik.errors.MascotaID} />
        ) : null}
      </Box>
      <Select
        onBlur={(event) => {
          if (event.target instanceof HTMLInputElement) {
            formik.setFieldValue("MascotaID", event.target.value);
          }

          formik.handleBlur("MascotaID")(event);
        }}
        placeholder="Seleccion su mascota"
        onChange={handleMascotaChange}
      >
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
        isDisabled={!formik.dirty}
        onClick={() => {
          formik.handleSubmit();
          if (formik.isValid) {
            setTimeout(() => {
              refetchData();
              onclose();
              formik.resetForm();
            }, 1000);
          }
        }}
      >
        Guardar
      </Button>
      <Button
        mt={4}
        background={"red"}
        color={"white"}
        _hover={{ background: "#e1403f" }}
        onClick={() => {
          onclose();
          formik.resetForm();
        }}
      >
        Cancelar
      </Button>
    </Box>
  );
};
