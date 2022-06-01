import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  Textarea,
  DrawerFooter,
  InputLeftAddon,
  InputRightAddon,
  Text,
  Badge,
} from "@chakra-ui/react";
import * as qs from "qs";
import axios from "axios";
import Project from "../components/Student/Project";
import { Link } from "react-router-dom";
import CreateProject from "../components/CreateProject";
import EditProjectStudent from "../components/EditProjectStudent";

const StudentDashboard = (userl) => {
  const [projects_undertaken, setProjectsUndertaken] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const curJWT = JSON.parse(localStorage.getItem("jwt"));
  const userlo = JSON.parse(localStorage.getItem("userdata"));
  const userrole = localStorage.getItem("user-role");
  const [Role, setRole] = useState("");
  // const [userlval, setUserl] = useState({});
  // const newuserinfo = userl.id;
  // get all users
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

  // get all projects
  const getProjectDetails = async () => {
    await axios
      .get(`http://localhost:1337/api/users/${userlo.id}?populate=*`, {
        headers: {
          Authorization: `Bearer ${curJWT}`,
        },
      })
      .then(function (response) {
        console.log("fetched projects......");
        // console.log(response.data.projects_undertaken);
        setProjectsUndertaken(response.data.projects_undertaken);
        setRole(response.data.user_role.role_name);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // calling the projects
  useEffect(() => {
    getProjectDetails();
    getallusers();
  }, []);
  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        px="10"
      >
        <Box></Box>
        <Menu>
          <MenuButton as={Button}>Control Dock ⏬</MenuButton>
          <MenuList>
            <MenuItem>
              <CreateProject allUsers={allUsers} />
            </MenuItem>
            {/* <MenuItem>
              <EditProjectStudent
                allUsers={allUsers}
                // projects_undertaken={projects_undertaken}
              />
            </MenuItem> */}
            {/* <MenuItem>
              <EditStudent allUsers={allUsers} />
            </MenuItem> */}
            {/* <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem> */}
          </MenuList>
        </Menu>
      </Box>
      {/* {console.log("data from login page", newuserinfo)} */}
      {/* {console.log(Role)} */}
      {Role === "student" && userrole === "student" ? (
        <Box>
          <Text fontSize="4xl">Welocome {userlo.username}</Text>
          <Text fontSize="2xl">These are the projects you are involved</Text>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-evenly"
            flexWrap="wrap"
          >
            {projects_undertaken.map((each) => {
              return (
                <Box>
                  <Project Role={Role} key={each.id} eachproject={each} />
                </Box>
              );
            })}
          </Box>
        </Box>
      ) : (
        <>
          <Text>
            You are registered as staff, please use{" "}
            <Link to="/faculty-dashboard">your own dashboard.</Link>
          </Text>
        </>
      )}

      <Box></Box>
    </>
  );
};

export default StudentDashboard;
