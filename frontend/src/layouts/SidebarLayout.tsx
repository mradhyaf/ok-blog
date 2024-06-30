import { Avatar, Box, Button, Flex, List, Show } from "@chakra-ui/react";
import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/useAuth";

const SidebarLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const sidebarSize = { flex: "1" };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <Flex justify="space-around" direction="row" minH="100vh">
      <Box sx={sidebarSize} as="aside" bg="gray.200" p={4}>
        <Avatar name={user.email} />
        <List>
          <Button onClick={handleHomeClick}>Home</Button>
          <Button onClick={handleLogoutClick}>Log out</Button>
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
