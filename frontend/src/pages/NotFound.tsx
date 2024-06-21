import { Flex, Heading, Link } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Flex justify="start" align="center" flexDir="column" h="50vh" my="2em">
      <Heading>404 Not Found</Heading>
      <Link as={NavLink} to="/">
        Go to Home
      </Link>
    </Flex>
  );
};

export default NotFound;
