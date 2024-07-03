import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { Blog, User } from "../types";
import { getAuthStatus, getPostById } from "../utils/fetch-requests";

export async function rootLoader() {
  const response = await getAuthStatus();
  const { success, user } = await response.json();

  if (!success) {
    redirect("/login", 401);
    return null;
  }

  redirect("/");
  return user as User;
}

export async function postLoader({ params }: LoaderFunctionArgs) {
  try {
    const id = parseInt(params.postId || "");
    const response = await getPostById(id);
    const { success, blog } = await response.json();

    if (!success) {
      return null;
    }

    return blog as Blog;
  } catch (error) {
    return null;
  }
}
