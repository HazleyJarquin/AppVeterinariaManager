import { Box, Button, FormLabel, Select } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { ChangeEvent } from "react";
import { IUsersRequest } from "../../../../interfaces";
import { WarningIcon } from "../../../../components/WarningIcon";
import { ValidatorField } from "../../../../components/ValidatorField";

interface Props {
  formik: FormikProps<IUsersRequest>;
  refetchData: () => void;
  onclose: () => void;
  isLoading: boolean;
}
export const CreateUsersForm = ({
  formik,
  refetchData,
  onclose,
  isLoading,
}: Props) => {
  const handleRolChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedRolID = event.target.value;
    formik.setFieldValue("RolID", selectedRolID);
  };

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <ValidatorField
        passwordField={false}
        formik={formik}
        formikField="Nombre"
        labelField="Nombre"
      />
      <ValidatorField
        passwordField={false}
        formik={formik}
        formikField="SNombre"
        labelField="Segundo Nombre"
      />

      <ValidatorField
        passwordField={false}
        formik={formik}
        formikField="Apellido"
        labelField="Apellido"
      />
      <ValidatorField
        passwordField={false}
        formik={formik}
        formikField="SApellido"
        labelField="Segundo Apellido"
      />
      <ValidatorField
        passwordField={false}
        formik={formik}
        formikField="NombreUsuario"
        labelField="Nombre de Usuario"
      />
      <ValidatorField
        passwordField={false}
        formik={formik}
        formikField="Correo"
        labelField="Correo"
        placheholder="example@example.com"
      />

      <ValidatorField
        formik={formik}
        formikField="Password"
        labelField="Password"
        passwordField
      />

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <FormLabel>Rol</FormLabel>
        {formik.errors.RolID && formik.touched.RolID ? (
          <WarningIcon message={formik.errors.RolID} />
        ) : null}
      </Box>
      <Select
        placeholder="Roles"
        onChange={handleRolChange}
        onBlur={(event) => {
          if (event.target instanceof HTMLInputElement) {
            formik.setFieldValue("RolID", event.target.value);
          }

          formik.handleBlur("RolID")(event);
        }}
      >
        <option value={1}>Veterinario</option>
        <option value={2}>Administrador</option>
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
