import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import { getPostById, getPosts } from "./functions/fetchRequests";
import { AuthProvider } from "./hooks/useAuth";
import AuthLayout from "./layouts/AuthLayout";
import SidebarLayout from "./layouts/SidebarLayout";
import Editor from "./pages/Editor";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Post from "./pages/Post";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<NotFound />}>
      <Route element={<SidebarLayout />}>
        <Route index element={<Home />} loader={getPosts} />
        <Route
          path="post/:postId"
          element={<Post />}
          loader={({ params }) => {
            try {
              const id = parseInt(params.postId || "");
              return getPostById(id);
            } catch (error) {
              return null;
            }
          }}
        />
        <Route path="new-post" element={<Editor />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
