import { Box, Button, FormLabel, Input } from "@chakra-ui/react";
import { FormikProps } from "formik";

import { IClientsRequest } from "../../../../interfaces";

interface Props {
  formik: FormikProps<IClientsRequest>;

  refetchData: () => void;
  onclose: () => void;
  isLoading: boolean;
}
export const CreateClientsForm = ({
  formik,
  refetchData,
  onclose,
  isLoading,
}: Props) => {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <FormLabel>Nombre Cliente</FormLabel>
      <Input
        placeholder="Nombre"
        value={formik.values.Nombre}
        onChange={formik.handleChange}
        name="Nombre"
      />

      <FormLabel>Apellido</FormLabel>
      <Input
        placeholder="Apellido"
        value={formik.values.Apellido}
        onChange={formik.handleChange}
        name="Apellido"
      />
      <FormLabel>Direccion</FormLabel>
      <Input
        placeholder="Direccion"
        value={formik.values.Direccion}
        onChange={formik.handleChange}
        name="Direccion"
      />

      <FormLabel>Correo</FormLabel>
      <Input
        placeholder="Correo"
        value={formik.values.Correo}
        onChange={formik.handleChange("Correo")}
        name="Correo"
      />
      <FormLabel>Celular</FormLabel>
      <Input
        placeholder="Cel"
        value={formik.values.Telefono}
        onChange={formik.handleChange("Telefono")}
        name="Celular"
      />

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
