import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";
import AuthLayout from "./layouts/AuthLayout";
import SidebarLayout from "./layouts/SidebarLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Post from "./pages/Post";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<NotFound />}>
      <Route element={<SidebarLayout />}>
        <Route index element={<Home />} />
        <Route path="post/:postId" element={<Post />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
