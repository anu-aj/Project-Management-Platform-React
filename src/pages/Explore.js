import axios from "axios";
import React from "react";
import { useHistory, Link, Navigate } from "react-router-dom";
import * as qs from "qs";
import { useState, useEffect } from "react";
import Navbar from "../components/Globals/Navbar";

// chakra imports
import {
  Table,
  Text,
  Box,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Input,
  Th,
  Td,
  Button,
  // Link,
  TableCaption,
  TableContainer,
  Avatar,
  AvatarBadge,
  AvatarGroup,
} from "@chakra-ui/react";

import { MdEmail } from "react-icons/md";

const ExploreProjects = () => {
  const [allUsers, setallUsers] = useState([]);
  const curJWT = JSON.parse(localStorage.getItem("jwt"));
  // let history = useHistory();
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
      .get(`http://localhost:1337/api/users?${query}`)
      .then((res) => {
        // console.log("Users list", res.data);
        setallUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getallusers();
  }, []);

  return (
    <>
      <Navbar />
      <Text fontSize="4xl" m="2">
        Faculties Registered with the portal
      </Text>
      <Box mt="10">
        {allUsers.map((eachuser) => {
          return eachuser.user_role.role_name == "faculty" ? (
            <Box bgColor="lightgray" rounded="2xl" m="5" maxW="2xl">
              <Box
                p="3"
                display="flex"
                flexDir="row"
                alignItems="center"
                // justifyContent="center"
              >
                <Avatar name={eachuser.username} />
                <Text fontSize="2xl" ml="4">
                  {eachuser.username}
                </Text>
              </Box>
              <Box p="3" display="flex" flexDir="row" alignItems="center">
                <Button>
                  <Box display="flex" alignItems="center">
                    <MdEmail size="30px" mr="2" />
                    <a href={`mailto:${eachuser.email}`}>
                      <Text>Mail regarding project</Text>
                    </a>
                  </Box>
                </Button>
              </Box>
            </Box>
          ) : (
            <></>
          );
        })}
      </Box>
    </>
    // <div>
    //   <Text fontSize="4xl" m="2">
    //     Explore all Projects
    //   </Text>
    //   <Box>
    //     {/* <Text>Search</Text> */}
    //     <Input
    //       // focusBorderColor="white"
    //       outline="transparent"
    //       border="darkgray"
    //       focusBorderColor="transparent"
    //       color="ivory"
    //       type="search"
    //       onChange={(e) => {
    //         setSearchTerm(e.target.value);
    //       }}
    //       placeholder="Search Projects...."
    //     />
    //   </Box>
    //   <TableContainer>
    //     <Table variant="striped" colorScheme="teal">
    //       <TableCaption>
    //         listed above are the projects undertaken by SIST
    //       </TableCaption>
    //       <Thead>
    //         <Tr>
    //           <Th>ID</Th>
    //           <Th>project Name</Th>
    //           <Th>GitHub Link</Th>
    //           <Th isNumeric>Dept</Th>
    //         </Tr>
    //       </Thead>
    //       <Tbody>
    //         {allprojects.map((each) => {
    //           return (
    //             <Tr>
    //               <Td>{each.id}</Td>
    //               <Td>{each.attributes.project_name}</Td>
    //               <Td>{each.attributes.gh_link}</Td>
    //               <Td isNumeric>{each.attributes.Dept}</Td>
    //             </Tr>
    //           );
    //         })}
    //         {/* {allprojects
    //           .filter((project) => {
    //             if (searchterm == "") {
    //               return project;
    //               console.log(project);
    //             } else if (
    //               project.attributes.project_name
    //                 .toLowerCase()
    //                 .includes(searchterm.toLowerCase()) ||
    //               project.attributes.Dept.toLowerCase().includes(
    //                 searchterm.toLowerCase()
    //               )
    //             ) {
    //               return project;
    //               console.log(project);
    //             }
    //           })
    //           .map((project) => {
    //             <Tr>
    //               <Td>{project.id}</Td>
    //               <Td>{project.attributes.project_name}</Td>
    //               <Td>{project.attributes.gh_link}</Td>
    //               <Td isNumeric>{project.attributes.Dept}</Td>
    //             </Tr>;
    //           })} */}
    //       </Tbody>
    //     </Table>
    //   </TableContainer>
    // </div>
  );
};

export default ExploreProjects;
