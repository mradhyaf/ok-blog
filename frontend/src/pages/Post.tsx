import { AddIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../hooks/useAuth";
import { Blog } from "../types";
import { followUser } from "../utils/fetch-requests";

const Post = () => {
  const { author, title, body } = useLoaderData() as Blog;
  const { user } = useContext(AuthContext);
  const toast = useToast();

  const handleFollow = async () => {
    console.log(user!.email, author);

    const { success } = await (await followUser(user!.email, author)).json();

    if (success) {
      toast({
        title: `Now following ${author}`,
        status: "success",
        isClosable: true,
      });
    } else {
      toast({
        title: "Something went wrong",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex direction="row" justify="space-between" align="center">
        <Heading as="h1">{title}</Heading>
        <Box>
          <Avatar name={author} />
          <Button
            colorScheme="orange"
            leftIcon={<AddIcon />}
            onClick={handleFollow}
          >
            Follow
          </Button>
        </Box>
      </Flex>
      <Container>
        <Text>{body}</Text>
      </Container>
    </>
  );
};

export default Post;
