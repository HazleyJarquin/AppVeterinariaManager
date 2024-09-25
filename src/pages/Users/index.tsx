import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { DataTable } from "../../components/DataTable";
import { IUsersResponse } from "../../interfaces";
import { useGetUserList } from "../../services/getAllUser.service";
import { CreateUsersForm } from "./components/CreateUsersForm";
import useCreateUsersHook from "../../hooks/useCreateUsers";

export const Users = () => {
  const { data: userData, isLoading, refetch } = useGetUserList();

  const { formik, isLoading: isLoadingCreateUsers } = useCreateUsersHook();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "Nombre",
      accessor: "nombre",
    },
    {
      Header: "Rol",
      accessor: "rol",
    },
    {
      Header: "Correo",
      accessor: "correo",
    },
  ];

  const data =
    userData?.map((user: IUsersResponse) => {
      return {
        id: user.UsuarioID,
        username: user.NombreUsuario,
        nombre: `${user.Nombre} ${user.Apellido}`,
        correo: user.Correo,
        rol: user.Rol.RoleName,
      };
    }) || [];
  return (
    <Box w={"100%"} mt={"20px"} display={"flex"} flexDirection={"column"}>
      {isOpen && (
        <Drawer
          closeOnOverlayClick={false}
          placement={"left"}
          onClose={onClose}
          isOpen={isOpen}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Agregar Usuario</DrawerHeader>
            <DrawerBody>
              <CreateUsersForm
                isLoading={isLoadingCreateUsers}
                onclose={onClose}
                refetchData={refetch}
                formik={formik}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
      <Box width={"100%"}>
        <DataTable
          isButton
          onClickButtonAdd={onOpen}
          titleButton="Agregar Usuario"
          pageSize={5}
          paginated
          paginatedPosition="center"
          tableTitle="Usuarios"
          columns={columns}
          data={data}
          loading={isLoading}
        />
      </Box>
    </Box>
  );
};
