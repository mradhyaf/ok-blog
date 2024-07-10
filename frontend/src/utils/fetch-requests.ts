const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Blog posts

export async function getPostsPreview(userEmail: string, author?: string) {
  return fetch(
    `${BACKEND_URL}/api/posts?reader=${userEmail}${
      author == undefined ? "" : "&author=" + author
    }`
  );
}

export function getPostById(id: number) {
  return fetch(`${BACKEND_URL}/api/posts/${id}`);
}

export async function createPost(author: string, title: string, body: string) {
  return fetch(`${BACKEND_URL}/api/posts`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ author, title, body }),
  });
}

// Auth

export async function getAuthStatus() {
  return fetch(`${BACKEND_URL}/api/auth/status`, { credentials: "include" });
}

export async function postAuthLogin(email: string, password: string) {
  return fetch(`${BACKEND_URL}/api/auth`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
}

// Users

export async function createUser(email: string, password: string) {
  return fetch(`${BACKEND_URL}/api/users`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function followUser(follower: string, followed: string) {
  return fetch(`${BACKEND_URL}/api/users/follows`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ follower, followed }),
  });
}

export async function blockUser(blocker: string, blocked: string) {
  return fetch(`${BACKEND_URL}/api/users/blocks`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ blocker, blocked }),
  });
}
