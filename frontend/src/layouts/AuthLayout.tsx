import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Flex
      align="flex-start"
      justify="center"
      borderRadius="lg"
      h="100vh"
      my="20vh"
    >
      <Box w ="30em" bg="gray.100" borderRadius="2em" p="4em">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default AuthLayout;
