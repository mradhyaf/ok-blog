import { Avatar, Box, Button, Flex, Link, List, Show } from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";

const SidebarLayout = () => {
  const sidebarSize = { flex: "1" };

  return (
    <Flex justify="space-around" direction="row" minH="100vh">
      <Box sx={sidebarSize} as="aside" bg="gray.200" p={4}>
        <Avatar name="John Doe" />
        <List>
          <Button>
            <Link as={NavLink} to="/">
              Home
            </Link>
          </Button>
        </List>
      </Box>
      <Box as="main" flex="4" p={4}>
        <Outlet />
      </Box>
      <Show above="md">
        <Box sx={sidebarSize} bg="gray.200" />
      </Show>
    </Flex>
  );
};

export default SidebarLayout;
