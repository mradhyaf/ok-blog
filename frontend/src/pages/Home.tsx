import {
  List,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/useAuth";
import { Blog } from "../types";
import { getPostsPreview } from "../utils/fetch-requests";

const Home = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const { user } = useContext(AuthContext);
  const filteredPosts = posts.filter((e) => e.author == user?.email);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPosts() {
      const response = await getPostsPreview(user!.email);
      const { success, blogs } = await response.json();

      if (!success) {
        return;
      }

      setPosts(blogs);
    }

    getPosts();
    return () => {};
  }, [user]);

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
                <Text>{post.title}</Text>
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
                  <Text>{post.title}</Text>
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
