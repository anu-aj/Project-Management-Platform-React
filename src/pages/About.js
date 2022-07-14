import React from "react";
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

const About = () => {
  return (
    <div>
      <Box display="flex" flexDirection="column" my="10" mx="3">
        <Box>
          <Text fontSize="4xl" mb="2">
            About Project Management Portal
          </Text>
          <Text fontSize="xl">
            PMP-Project Management Platform is an online forum for the students
            and guides to get under one umbrella and keep track of the project
            and its progress. This web app will connect Students and explore
            their senior’s project for reference. This web app is exclusively
            for Sathyabama university to make the project submission and grading
            process easier.A unified digital platform to upload, access and
            download the project files.The guides can track the project status
            of the student through this web app.
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export default About;
