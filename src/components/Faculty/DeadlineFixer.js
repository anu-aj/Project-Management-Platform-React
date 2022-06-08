import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  useColorMode,
  Badge,
  Text,
  Stack,
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  useToast,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

// Date picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DeadlineFixer = ({ eachproject }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const curJWT = JSON.parse(localStorage.getItem("jwt"));
  //   for date
  const [startDate, setStartDate] = useState(new Date());
  const toast = useToast();

  //   const formatter = (datestring) => {
  //     let date = datestring.toJSON().slice(0, 10);
  //     let ndate =
  //       date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4);
  //     return ndate;
  //   };
  const datepayload = {
    data: {
      project_name: eachproject.project_name,
      Dept: eachproject.Dept,
      project_description: eachproject.project_description,
      Deadline: startDate.toLocaleDateString("en-CA"),
    },
  };

  const setDeadline = async () => {
    await axios
      .put(
        `http://localhost:1337/api/projects/${eachproject.id}`,
        datepayload,
        {
          headers: {
            Authorization: `Bearer ${curJWT}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast({
          title: "Deadline Updated Successfully...",
          description: `Status : ${res.status}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Deadline Updation Failed...",
          description: `Status : ${err.status}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <Button onClick={onOpen} colorScheme="facebook" size="sm">
        {eachproject.Deadline ? "Update Deadline" : "Set Deadline"}
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bgColor="lightgray">
          <ModalHeader>
            You are setting deadline for the project "{eachproject.project_name}
            "
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {/* {console.log(startDate.toLocaleDateString("en-CA"))} */}
              <DatePicker
                dateFormat="dd/M/yyyy"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <Button
                onClick={setDeadline}
                colorScheme="facebook"
                size="sm"
                mt="5"
              >
                Set Deadline
              </Button>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeadlineFixer;
