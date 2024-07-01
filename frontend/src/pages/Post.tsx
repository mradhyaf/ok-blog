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
import { useLoaderData } from "react-router-dom";
import { Blog } from "../types";

const Post = () => {
  const { author, title, body } = useLoaderData() as Blog;
  const toast = useToast();

  const followPromise = new Promise((resolve) => {
    setTimeout(() => resolve(200), 5000);
  });

  const handleFollow = () => {
    toast.promise(followPromise, {
      success: { title: "Promise resolved", description: "Looks great" },
      error: { title: "Promise rejected", description: "Something wrong" },
      loading: { title: "Promise pending", description: "Please wait" },
    });
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
