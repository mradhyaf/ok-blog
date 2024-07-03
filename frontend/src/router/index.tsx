import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import RootLayout from "../layouts/RootLayout";
import SidebarLayout from "../layouts/SidebarLayout";
import Editor from "../pages/Editor";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Post from "../pages/Post";
import SignUp from "../pages/SignUp";
import { postLoader, rootLoader } from "./loaders";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      errorElement={<NotFound />}
      loader={rootLoader}
    >
      <Route element={<SidebarLayout />}>
        <Route index element={<Home />} />
        <Route path="post/:postId" element={<Post />} loader={postLoader} />
        <Route path="new-post" element={<Editor />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
    </Route>
  )
);

export default router;
