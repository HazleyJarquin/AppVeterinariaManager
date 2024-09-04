import { Box, Button } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { IClientsRequest } from "../../../../interfaces";
import { ValidatorField } from "../../../../components/ValidatorField";

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
      <ValidatorField
        formik={formik}
        formikField="Nombre"
        labelField="Nombre"
        passwordField={false}
      />
      <ValidatorField
        formik={formik}
        formikField="Apellido"
        labelField="Apellido"
        passwordField={false}
      />
      <ValidatorField
        formik={formik}
        formikField="Direccion"
        labelField="Direccion"
        passwordField={false}
      />
      <ValidatorField
        formik={formik}
        formikField="Correo"
        labelField="Correo"
        passwordField={false}
      />
      <ValidatorField
        formik={formik}
        formikField="Telefono"
        labelField="Celular"
        passwordField={false}
      />

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
