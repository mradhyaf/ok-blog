import { Heading, List, ListItem, Progress, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Post {
  title: string;
  body: string;
}

const mockData = [
  {
    title: "Post 1",
    body: "This is the body of post 1",
  },
  {
    title: "Post 2",
    body: "This is the body of post 2",
  },
  {
    title: "Post 3",
    body: "This is the body of post 3",
  },
];

const Home = () => {
  // fetch data from an API
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setPosts(mockData);
    }, 5000);

    return () => {
      console.log("cleanup");
    };
  }, []);

  return (
    <>
      <Heading as="h1">Posts</Heading>
      {posts.length === 0 ? (
        <Progress size="xs" isIndeterminate />
      ) : (
        <List>
          {posts.map((post, index) => (
            <ListItem key={index} bg={"gray.300"} p={4} m={2}>
              <Heading as="h3">{post.title}</Heading>
              <Text>{post.body}</Text>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default Home;
