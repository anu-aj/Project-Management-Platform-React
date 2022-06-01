import React, { useState, useEffect } from "react";
import * as qs from "qs";
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

const EditProjectStudent = ({ eachproject, users_involved }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [allUsers, setAllUsers] = useState([]);
  const [staffID, setStaffID] = useState([]);
  const [studentID, setStudentID] = useState([]);
  const [projectname, setProjectname] = useState("");
  const [projectdesc, setProjectdesc] = useState("");
  const [projectghlink, setProjectghlink] = useState("");
  const curJWT = JSON.parse(localStorage.getItem("jwt"));

  const getallusers = async () => {
    // query to get role
    const query = qs.stringify(
      {
        populate: ["user_role"],
      },
      {
        encodeValuesOnly: true,
      }
    );
    await axios
      .get(`http://localhost:1337/api/users?${query}`, {
        headers: {
          Authorization: `Bearer ${curJWT}`,
        },
      })
      .then((res) => {
        console.log("Users list", res.data);
        setAllUsers(res.data);
        // setRole(res.data.user_role.role_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const teamoptions = [];
  const defoptions = [];
  const reqarray = [];

  users_involved.map((eachuser) => {
    if (eachuser.attributes.user_role.data.attributes.role_name === "student") {
      const user = new Object();
      user.value = eachuser.id;
      user.label = eachuser.attributes.username;
      defoptions.push(user);
    }
  });
  console.log("default options", defoptions);
  allUsers.map((eachuser) => {
    if (eachuser.user_role.role_name === "student") {
      const user = new Object();
      user.value = eachuser.id;
      user.label = eachuser.username;
      teamoptions.push(user);
    }
  });

  const handlesubmitteam = (teamoptions) => {
    setStudentID(teamoptions);
  };

  studentID.map((eachstudent) => {
    const studentID = eachstudent.value;
    reqarray.push(studentID);
  });

  //   console.log("reqarray", reqarray);
  const reqpayload = {};
  // req payload
  if (reqarray.length == 0) {
    const reqpayload = {
      data: {
        project_description: projectdesc
          ? projectdesc
          : eachproject.project_description
          ? eachproject.project_description
          : "",
        gh_link: projectghlink
          ? projectghlink
          : eachproject.gh_link
          ? eachproject.gh_link
          : "",
      },
    };
  } else {
    const reqpayload = {
      data: {
        project_description: projectdesc
          ? projectdesc
          : eachproject.project_description
          ? eachproject.project_description
          : "",
        gh_link: projectghlink
          ? projectghlink
          : eachproject.gh_link
          ? eachproject.gh_link
          : "",
        users_involved: reqarray,
      },
    };
  }
  console.log("payload", reqpayload);
  useEffect(() => {
    // getProjectDetails();
    getallusers();
  }, []);

  const Editproject = async () => {
    await axios.put(`http://localhost:1337/api/projects/${eachproject.id}`);
  };
  return (
    <>
      <Button
        ref={btnRef}
        size="sm"
        textAlign="center"
        w="full"
        colorScheme="green"
        onClick={onOpen}
      >
        Edit Project
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
          <DrawerHeader>Edit project {eachproject.project_name}</DrawerHeader>

          <DrawerBody>
            <Box>
              <label htmlFor="project_desc">
                Update your Project description
              </label>
              <Textarea
                onChange={(e) => {
                  setProjectdesc(e.target.value);
                }}
                placeholder="Enter your new project description"
                id="desc"
              />
            </Box>
            <Box my="5">
              <label htmlFor="gh_link">Update your Project's GitHub link</label>
              <Input
                onChange={(e) => {
                  setProjectghlink(e.target.value);
                }}
                placeholder="Enter the new github link"
              />
            </Box>
            {/* <Box>
              <label htmlFor="staff selecetion">
                Select your Incharge staff
              </label>
              <Select
                isMulti={true}
                onChange={handlesubmit}
                options={facoptions}
              />
            </Box> */}
            <Box>
              <label htmlFor="team selection">Update your team members</label>
              <Select
                isMulti={true}
                onChange={handlesubmitteam}
                defaultValue={defoptions}
                options={teamoptions}
              />
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={Editproject} colorScheme="green">
              Edit the project
            </Button>
          </DrawerFooter>
        </DrawerContent>
        {/* {console.log(
          "users involevd in the porjects",
          users_involved[0].attributes.user_role.data.attributes.role_name
        )} */}
      </Drawer>
    </>
  );
};

export default EditProjectStudent;
