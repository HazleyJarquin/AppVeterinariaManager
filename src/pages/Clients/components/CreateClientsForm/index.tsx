import { Box, Button } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { IClientsRequest } from "../../../../interfaces";
import { ValidatorField } from "../../../../components/ValidatorField";
import { useGetClientList } from "../../../../services/getAllClients.service";

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
  const { data: clientsData } = useGetClientList();
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
        isClientForm
        clientsData={clientsData}
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
        isDisabled={
          !formik.dirty ||
          clientsData?.some(
            (user: { Correo: string }) => user.Correo === formik.values.Correo
          )
        }
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
