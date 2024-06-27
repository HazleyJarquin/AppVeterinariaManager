import { Box, Button, Heading } from "@chakra-ui/react";
import { DataTable } from "../../components/DataTable";
import { useGetUserList } from "../../services/getAllUser.service";
import { IUsersResponse } from "../../interfaces";

export const Users = () => {
  const { data: userData, isLoading } = useGetUserList();

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
      Header: "Correo",
      accessor: "correo",
    },
    {
      Header: "Rol",
      accessor: "rol",
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
    <Box w={"100%"} display={"flex"} flexDirection={"column"}>
      <Box
        w={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading>Users</Heading>
        <Button>Add User</Button>
      </Box>

      <Box width={"100%"}>
        <DataTable columns={columns} data={data} loading={isLoading} />
      </Box>
    </Box>
  );
};
