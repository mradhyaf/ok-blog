import { Blog, User } from "../types";

const API_URL = "http://localhost:3001/api";

// Blog posts

export async function getPosts(): Promise<Blog[]> {
  try {
    const response = await fetch(`${API_URL}/posts`);
    const { blogs } = await response.json();
    return blogs;
  } catch (error) {
    return [];
  }
}

export async function getPostById(id: number): Promise<Blog | null> {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`).then((res) =>
      res.json()
    );

    return response.success ? response.post : null;
  } catch (error) {
    return null;
  }
}

export async function createPost(
  author: string,
  title: string,
  body: string
): Promise<boolean> {
  try {
    const reqBody = JSON.stringify({ author, title, body });
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      body: reqBody,
    }).then((res) => res.json());

    return response.success;
  } catch (error) {
    return false;
  }
}

// Users

export async function authUser(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const response = await fetch(
      `${API_URL}/users?email=${email}&password=${password}`
    ).then((res) => res.json());

    if (response.success) {
      return response.user;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function createUser(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const body = JSON.stringify({ email, password });
    const response = await fetch(`${API_URL}/users`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body,
    }).then((res) => res.json());

    return response.success;
  } catch (error) {
    return false;
  }
}

export async function followUser(
  follower: string,
  followed: string
): Promise<boolean> {
  try {
    const body = JSON.stringify({ follower, followed });
    const response = await fetch(`${API_URL}/users/follows`, {
      method: "POST",
      body,
    }).then((res) => res.json());

    return response.success;
  } catch (error) {
    return false;
  }
}

export async function blockUser(
  blocker: string,
  blocked: string
): Promise<boolean> {
  try {
    const body = JSON.stringify({ blocker, blocked });
    const response = await fetch(`${API_URL}/users/blocks`, {
      method: "POST",
      body,
    }).then((res) => res.json());

    return response.success;
  } catch (error) {
    return false;
  }
}
