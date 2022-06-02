import React, { useState, useEffect } from "react";
import {
  useDisclosure,
  Box,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  FormLabel,
  Input,
  InputGroup,
  //   Select,
  Textarea,
  DrawerFooter,
  InputLeftAddon,
  InputRightAddon,
  Text,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Select from "react-select";
import axios from "axios";

const Completionsetter = ({ eachproject }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ustatus, setUstatus] = useState(eachproject.Completion_status);
  const curJWT = JSON.parse(localStorage.getItem("jwt"));

  //   options
  const statusoptions = [
    { value: "Just Started (0%)", label: "Just Started (0%)" },
    { value: "A little bit (25%)", label: "A little bit (25%)" },
    { value: "Halfway done (50%)", label: "Halfway done (50%)" },
    { value: "Almost there (75%)", label: "Almost there (75%)" },
    { value: "Done (100%)", label: "Done (100%)" },
  ];

  //   handler
  const handleSubmit = (statusoptions) => {
    setUstatus(statusoptions.value);
  };

  console.log(ustatus);
  const repayload = {
    data: {
      Completion_status: ustatus,
    },
  };

  console.log("payload", repayload);
  //   update completion status function
  const UpdateCompletionStatus = async () => {
    await axios
      .put(`http://localhost:1337/api/projects/${eachproject.id}`, repayload, {
        headers: {
          Authorization: `Bearer ${curJWT}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Button size="sm" colorScheme="blue" onClick={onOpen}>
        Update Completion status
      </Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Update completion status for {eachproject.project_name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb="10">
              <label htmlFor="completionststus">
                Update your Completion status
              </label>
              <Select
                defaultValue={[
                  {
                    label: eachproject.Completion_status,
                    value: eachproject.Completion_status,
                  },
                ]}
                isMulti={false}
                onChange={handleSubmit}
                options={statusoptions}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={UpdateCompletionStatus} colorScheme="green">
              Update Completion status
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Completionsetter;
