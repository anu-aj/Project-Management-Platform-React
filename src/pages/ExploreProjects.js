import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

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
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const ExploreProjects = () => {
  const [allprojects, setAllProjects] = useState([]);
  const [searchterm, setSearchTerm] = useState("");
  const getAllProjects = async () => {
    await axios
      .get("http://localhost:1337/api/projects")
      .then((res) => {
        setAllProjects(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllProjects();
  }, []);

  return (
    <div>
      <Text fontSize="4xl" m="2">
        Explore all Projects
      </Text>
      <Box>
        {/* <Text>Search</Text> */}
        <Input
          // focusBorderColor="white"
          outline="transparent"
          border="darkgray"
          focusBorderColor="transparent"
          color="ivory"
          type="search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search Projects...."
        />
      </Box>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>
            listed above are the projects undertaken by SIST
          </TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>project Name</Th>
              <Th>GitHub Link</Th>
              <Th isNumeric>Dept</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allprojects.map((each) => {
              return (
                <Tr>
                  <Td>{each.id}</Td>
                  <Td>{each.attributes.project_name}</Td>
                  <Td>{each.attributes.gh_link}</Td>
                  <Td isNumeric>{each.attributes.Dept}</Td>
                </Tr>
              );
            })}
            {/* {allprojects
              .filter((project) => {
                if (searchterm == "") {
                  return project;
                  console.log(project);
                } else if (
                  project.attributes.project_name
                    .toLowerCase()
                    .includes(searchterm.toLowerCase()) ||
                  project.attributes.Dept.toLowerCase().includes(
                    searchterm.toLowerCase()
                  )
                ) {
                  return project;
                  console.log(project);
                }
              })
              .map((project) => {
                <Tr>
                  <Td>{project.id}</Td>
                  <Td>{project.attributes.project_name}</Td>
                  <Td>{project.attributes.gh_link}</Td>
                  <Td isNumeric>{project.attributes.Dept}</Td>
                </Tr>;
              })} */}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ExploreProjects;
