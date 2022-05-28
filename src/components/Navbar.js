import { React, useState } from "react";
import { Box, Flex, Text, Button, Stack } from "@chakra-ui/react";
import { Link, Navigate } from "react-router-dom";
import NavLogo from "./NavLogo";

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      <NavLogo w="100px" />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Text display="block" {...rest}>
      {children}
    </Text>
  );
};

const MenuLinks = ({ isOpen }) => {
  const [clearData, setClearData] = useState(false);
  // logout functionality
  const logout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("jwt");
    localStorage.removeItem("user-role");
    setClearData(true);
  };
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem>
          <Link to="/">
            <Text color="black">Home</Text>
          </Link>
        </MenuItem>
        {localStorage.getItem("userdata") ? (
          <MenuItem>
            <Text cursor="pointer" onClick={logout} color="black">
              Logout
            </Text>
          </MenuItem>
        ) : (
          <MenuItem>
            <Link to="/login">
              <Text cursor="pointer" color="black">
                Login
              </Text>
            </Link>
          </MenuItem>
        )}
        <MenuItem>
          <Link to="/About">
            <Text color="black">About</Text>
          </Link>
        </MenuItem>
        <MenuItem isLast>
          <Link to="/Explore">
            <Button
              size="sm"
              rounded="md"
              color="black"
              bg="lightblue"
              _hover={{
                bg: [
                  "primary.100",
                  "primary.100",
                  "primary.100",
                  "primary.901",
                ],
              }}
            >
              Explore
            </Button>
          </Link>
        </MenuItem>
      </Stack>
      {clearData ? <Navigate to="/" replace /> : <></>}
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={5}
      mt={0}
      bg={["primary.901", "primary.901", "transparent", "transparent"]}
      color={["white", "white", "primary.900", "primary.900"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Navbar;
