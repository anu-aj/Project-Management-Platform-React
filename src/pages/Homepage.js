import React from "react";
import sistimg from "../imgs/sist1.jpg";
import Navbar from "../components/Globals/Navbar";
import "../App.css";
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

const myStyle = {
  backgroundImage: `url(${sistimg})`,
  height: "100vh",
  fontSize: "30px",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="Home" style={myStyle}>
        <div className="centered_typing">
          <Box
            className="wrapper_type_head"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="40vh"
          >
            <div className="typing-demo_head">
              <Text fontSize={{ base: "4xl", md: "5xl" }}>
                Project Management Platform
              </Text>
            </div>
            <Box
              boxShadow="dark-lg"
              bgColor="whiteAlpha.700"
              p="2"
              borderRadius="3xl"
              position="absolute"
              bottom="10"
            >
              <Text fontSize="lg">Built by</Text>
              <Text fontSize="lg">
                Vishwa R | Anugraha J | P.J Benhur Edmond Hilary
              </Text>
              <Text fontSize="lg">CSE department, SIST Chennai</Text>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}
