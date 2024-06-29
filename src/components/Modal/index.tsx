import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;

  modalTitle: string;
}
export const Modal = ({
  children,

  isOpen,
  onClose,
  modalTitle,
}: ModalProps) => {
  return (
    <ChakraModal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};
