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

import { useGetClientList } from "../../services/getAllClients.service";
import { IClientsResponse } from "../../interfaces";

import { CreateClientsForm } from "./components/CreateClientsForm";
import useCreateClientsHook from "../../hooks/useCreateClientsHook";

export const Clients = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { formik, isLoading: isLoadingCreateClients } = useCreateClientsHook();

  const {
    data: clientData,
    isLoading,
    refetch: clientListRefetch,
  } = useGetClientList();

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "UserName",
      accessor: "username",
    },
    {
      Header: "Nombre",
      accessor: "nombre",
    },
    {
      Header: "Direccion",
      accessor: "dir",
    },
    {
      Header: "Correo",
      accessor: "correo",
    },
  ];

  const data =
    clientData?.map((user: IClientsResponse) => {
      return {
        id: user.ClienteID,
        username: user.Nombre,
        nombre: `${user.Nombre} ${user.Apellido}`,
        dir: user.Direccion,
        correo: user.Correo,
      };
    }) || [];
  return (
    <Box w={"100%"} mt={"20px"} display={"flex"} flexDirection={"column"}>
      <Drawer
        closeOnOverlayClick={false}
        placement={"left"}
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Agregar Cliente</DrawerHeader>
          <DrawerBody>
            <CreateClientsForm
              isLoading={isLoadingCreateClients}
              onclose={onClose}
              refetchData={clientListRefetch}
              formik={formik}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box width={"100%"}>
        <DataTable
          isButton
          onClickButtonAdd={onOpen}
          titleButton="Agregar Cliente"
          pageSize={5}
          paginated
          paginatedPosition="center"
          tableTitle="Clientes"
          columns={columns}
          data={data}
          loading={isLoading}
        />
      </Box>
    </Box>
  );
};
