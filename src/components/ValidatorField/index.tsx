import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { WarningIcon } from "../WarningIcon";
import { FormikProps } from "formik";
import { useState } from "react";

interface Props {
  formik: FormikProps<any>;
  formikField: string;
  labelField: string;
  placheholder?: string;
  passwordField: boolean;
  isClientForm?: boolean;
  usersData?: any;
  clientsData?: any;
}

export const ValidatorField = ({
  formik,
  formikField,
  labelField,
  placheholder = labelField,
  passwordField = false,
  isClientForm = false,
  usersData,
  clientsData,
}: Props) => {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);
  const errorMessage =
    typeof formik.errors[formikField] === "string"
      ? formik.errors[formikField]
      : "";

  const getWarningMessage = () => {
    if (formikField === "NombreUsuario") {
      return usersData?.some(
        (user: { NombreUsuario: string }) =>
          user.NombreUsuario.toLowerCase() ===
          formik.values.NombreUsuario.toLowerCase()
      )
        ? "El nombre de usuario ya existe"
        : null;
    } else if (formikField === "Correo") {
      return isClientForm
        ? clientsData?.some(
            (user: { Correo: string }) => user.Correo === formik.values.Correo
          )
          ? "El correo ya existe"
          : null
        : usersData?.some(
            (user: { Correo: string }) => user.Correo === formik.values.Correo
          )
        ? "El correo ya existe"
        : null;
    }
    return null;
  };

  const warningMessage = getWarningMessage();

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <FormLabel>{labelField}</FormLabel>
        {formik.errors[formikField] && formik.touched[formikField] ? (
          <WarningIcon message={errorMessage} />
        ) : null}

        {warningMessage && <WarningIcon message={warningMessage} />}
      </Box>
      {passwordField ? (
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="****"
            value={formik.values[formikField]}
            onChange={formik.handleChange}
            name={formikField}
            onBlur={(event) => {
              if (event.target instanceof HTMLInputElement) {
                formik.setFieldValue(formikField, event.target.value);
              }

              formik.handleBlur(formikField)(event);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : (
        <Input
          placeholder={placheholder}
          value={formik.values[formikField]}
          onChange={formik.handleChange}
          name={formikField}
          onBlur={(event) => {
            if (event.target instanceof HTMLInputElement) {
              formik.setFieldValue(formikField, event.target.value);
            }

            formik.handleBlur(formikField)(event);
          }}
        />
      )}
    </>
  );
};
