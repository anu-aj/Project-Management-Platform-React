import React from "react";
import { Box, Spinner } from "@chakra-ui/react";
const Loading = () => {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner
          mt="50vh"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    </>
  );
};

export default Loading;
