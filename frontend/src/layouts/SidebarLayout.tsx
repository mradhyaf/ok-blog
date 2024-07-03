import { Avatar, Box, Button, Flex, Show, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/useAuth";

const SidebarLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleNewPostClick = () => {
    navigate("/new-post");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <Flex justify="space-around" direction="row" minH="100vh">
      <Box flex={1} as="aside" bg="gray.200" p={4}>
        <Avatar m={4} name={user.email} />
        <Stack spacing={4}>
          <Button onClick={handleNewPostClick}>New Post</Button>
          <Button onClick={handleHomeClick}>Home</Button>
          <Button onClick={handleLogoutClick}>Log out</Button>
        </Stack>
      </Box>
      <Box as="main" flex={4} p={4} maxW="60vw">
        <Outlet />
      </Box>
      <Show above="md">
        <Box flex={1} as="aside" bg="gray.200" />
      </Show>
    </Flex>
  );
};

export default SidebarLayout;
