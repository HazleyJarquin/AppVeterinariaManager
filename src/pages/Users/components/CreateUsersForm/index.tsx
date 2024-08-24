import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { FormikProps } from "formik";

import { ChangeEvent, useState } from "react";
import { IUsersRequest } from "../../../../interfaces";

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
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const handleRolChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedRolID = event.target.value;
    formik.setFieldValue("RolID", selectedRolID);
  };

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <FormLabel>Nombre</FormLabel>
      <Input
        placeholder="Nombre"
        value={formik.values.Nombre}
        onChange={formik.handleChange}
        name="Nombre"
      />
      <FormLabel>Segundo Nombre</FormLabel>
      <Input
        placeholder="Segundo Nombre"
        value={formik.values.SNombre}
        onChange={formik.handleChange}
        name="SNombre"
      />
      <FormLabel>Apellido</FormLabel>
      <Input
        placeholder="Apellido"
        value={formik.values.Apellido}
        onChange={formik.handleChange}
        name="Apellido"
      />
      <FormLabel>Segundo Apellido</FormLabel>
      <Input
        placeholder="Segundo Apellido"
        value={formik.values.SApellido}
        onChange={formik.handleChange}
        name="SApellido"
      />
      <FormLabel>Nombre de Usuario</FormLabel>
      <Input
        placeholder="Nombre de Usuario"
        value={formik.values.NombreUsuario}
        onChange={formik.handleChange}
        name="NombreUsuario"
      />
      <FormLabel>Correo</FormLabel>
      <Input
        placeholder="Correo"
        value={formik.values.Correo}
        onChange={formik.handleChange}
        name="Correo"
      />
      <FormLabel>Contraseña</FormLabel>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="****"
          value={formik.values.Password}
          onChange={formik.handleChange}
          name="Password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormLabel>Rol</FormLabel>
      <Select placeholder="Roles" onChange={handleRolChange}>
        <option value={1}>Veterinario</option>
        <option value={2}>Administrador</option>
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
