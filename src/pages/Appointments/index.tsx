import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import { DataTable } from "../../components/DataTable";

import { useGetAppointmentList } from "../../services/getAppointments.service";

import { CreateAppointmentsForm } from "./components/CreateAppointmentsForm";
import useCreateAppointmentsHook from "../../hooks/useCreateAppointmentsHook";
import { useGetVetCatalog } from "../../services/getVetCatalog.service";
import { useGetPetCatalog } from "../../services/getPetCatalog.service";
import { useDeactivateAppointment } from "../../services/deactivateAppointment.service";
import useTableConfig from "./config/tableConfig";

export const Appointments = () => {
  const { formik, isLoading } = useCreateAppointmentsHook();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatearFecha = (fechaCompleta: string) => {
    const fecha = new Date(fechaCompleta);
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
    return `${dia < 10 ? "0" + dia : dia}/${
      mes < 10 ? "0" + mes : mes
    }/${anio}`;
  };

  const {
    data: appointmentData,

    refetch: refetchData,
  } = useGetAppointmentList();
  const { data: vetCatalogData } = useGetVetCatalog();
  const { data: petDataCatalog } = useGetPetCatalog();
  const { mutate: deactivateAppointmentMutate } = useDeactivateAppointment();

  const { columns, columnsWithoutActions, data, dataCompleted } =
    useTableConfig({
      appointmentData,
      deactivateAppointmentMutate,
      refetchData,
      formatearFecha,
    });

  return (
    <Box
      w={"100%"}
      display={"flex"}
      flexDirection={"column"}
      mt={"20px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Tabs w={"100%"} variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>Citas pendientes</Tab>
          <Tab>Citas completadas</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box
              w={"100%"}
              h={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <Drawer
                closeOnOverlayClick={false}
                placement={"left"}
                onClose={onClose}
                isOpen={isOpen}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerHeader borderBottomWidth="1px">
                    Agendar Cita
                  </DrawerHeader>
                  <DrawerBody>
                    <CreateAppointmentsForm
                      isLoading={isLoading}
                      petCatalogData={petDataCatalog}
                      onclose={onClose}
                      refetchData={refetchData}
                      dataVeterinarios={vetCatalogData}
                      formik={formik}
                    />
                  </DrawerBody>
                </DrawerContent>
              </Drawer>

              <DataTable
                isButton
                titleButton="Agregar Cita"
                onClickButtonAdd={onOpen}
                tableTitle="Citas Pendientes"
                columns={columns}
                data={data}
                loading={isLoading}
                pageSize={5}
                paginated
                paginatedPosition="center"
              />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box
              w={"100%"}
              h={"100%"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <DataTable
                isButton={false}
                titleButton=""
                onClickButtonAdd={() => {}}
                tableTitle="Citas Completadas"
                columns={columnsWithoutActions}
                data={dataCompleted}
                loading={isLoading}
                pageSize={5}
                paginated
                paginatedPosition="center"
              />
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
