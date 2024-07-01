import {
  Heading,
  List,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/useAuth";

interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  createdAt: string;
}

const Home = () => {
  const posts = useLoaderData() as Post[];
  const { user } = useContext(AuthContext);
  const filteredPosts = posts.filter((e) => e.author == user?.email);
  const navigate = useNavigate();

  const handlePostClick = (postId: number) => {
    return () => navigate(`/post/${postId}`);
  };

  return (
    <Tabs isFitted>
      <TabList>
        <Tab>Feed</Tab>
        <Tab>Following</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <List>
            {posts.map((post, index) => (
              <ListItem
                key={index}
                bg={"gray.300"}
                p={4}
                m={2}
                onClick={handlePostClick(post.id)}
              >
                <Heading as="h3">{post.title}</Heading>
              </ListItem>
            ))}
          </List>
        </TabPanel>
        <TabPanel>
          <List>
            <List>
              {filteredPosts.map((post, index) => (
                <ListItem
                  key={index}
                  bg={"gray.300"}
                  p={4}
                  m={2}
                  onClick={handlePostClick(post.id)}
                >
                  <Heading as="h3">{post.title}</Heading>
                  <Text>{Date.parse(post.createdAt)}</Text>
                </ListItem>
              ))}
            </List>
          </List>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Home;
