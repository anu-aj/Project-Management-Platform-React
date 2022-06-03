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
} from "@chakra-ui/react";
import Select from "react-select";
import axios from "axios";

const CreateProject = ({ allUsers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [staffID, setStaffID] = useState([]);
  const [studentID, setStudentID] = useState([]);
  const [projectname, setProjectname] = useState("");
  const [projectdesc, setProjectdesc] = useState("");
  const [projectghlink, setProjectghlink] = useState("");
  const curJWT = JSON.parse(localStorage.getItem("jwt"));
  //   faculty selection options
  const facoptions = [];
  const teamoptions = [];
  const reqarray = [];
  allUsers.map((eachuser) => {
    if (eachuser.user_role.role_name === "faculty") {
      const user = new Object();
      user.value = eachuser.id;
      user.label = eachuser.username;
      facoptions.push(user);
    } else {
      const user = new Object();
      user.value = eachuser.id;
      user.label = eachuser.username;
      teamoptions.push(user);
    }
  });

  staffID.map((eachstaff) => {
    const staffid = eachstaff.value;
    reqarray.push(staffid);
  });
  studentID.map((eachstudent) => {
    const studentID = eachstudent.value;
    reqarray.push(studentID);
  });

  //   console.log("reqarray", reqarray);

  //   submit handler
  const handlesubmit = (facoptions) => {
    setStaffID(facoptions);
  };

  const handlesubmitteam = (teamoptions) => {
    setStudentID(teamoptions);
  };
  // req payload
  const reqpayload = {
    data: {
      project_name: projectname,
      project_description: projectdesc,
      gh_link: projectghlink,
      users_involved: reqarray,
    },
  };
  console.log("payload", reqpayload);
  console.log("incharge staff", staffID);
  //   create project function
  const createProject = async () => {
    await axios
      .post(`http://localhost:1337/api/projects`, reqpayload, {
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
      <Button ref={btnRef} w="full" colorScheme="green" onClick={onOpen}>
        Create a new Project
      </Button>
      <Drawer
        size="lg"
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create a new project</DrawerHeader>

          <DrawerBody>
            <Box>
              <label htmlFor="project_name">Enter your Project name</label>
              <Input
                required={true}
                onChange={(e) => {
                  setProjectname(e.target.value);
                }}
                placeholder="Enter your project title"
              />
            </Box>
            <Box my="5">
              <label htmlFor="project_desc">
                Enter your Project description
              </label>
              <Textarea
                onChange={(e) => {
                  setProjectdesc(e.target.value);
                }}
                placeholder="Enter your project description"
                id="desc"
              />
            </Box>
            <Box>
              <label htmlFor="gh_link">Enter your Project's GitHub link</label>
              <Input
                onChange={(e) => {
                  setProjectghlink(e.target.value);
                }}
                placeholder="Enter the github link"
              />
            </Box>
            <Box my="5">
              <label htmlFor="staff selecetion">
                Select your Incharge staff
              </label>
              <Select
                isMulti={true}
                onChange={handlesubmit}
                options={facoptions}
              />
            </Box>
            <Box>
              <label htmlFor="team selection">
                Select Team members including you
              </label>
              <Select
                isMulti={true}
                onChange={handlesubmitteam}
                options={teamoptions}
              />
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={
                projectname != "" &&
                projectdesc != "" &&
                staffID.length != 0 &&
                studentID.length != 0
                  ? false
                  : true
              }
              onClick={createProject}
              colorScheme="green"
            >
              Create a new project
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateProject;
