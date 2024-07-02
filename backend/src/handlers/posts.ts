import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import {
  insertPost,
  selectAllUnreadPostsPreviewBy,
  selectAllVisiblePostsPreview,
  selectPostById,
} from "../db/queries/posts.js";

export async function getPostsPreview(request: Request, response: Response) {
  const validationErrors = validationResult(request);

  if (!validationErrors.isEmpty()) {
    return response.status(400).send({ success: false, msg: "Bad request" });
  }

  const { author, reader } = matchedData(request);

  if (author) {
    const res = await selectAllUnreadPostsPreviewBy({ reader, author });
    return response
      .status(201)
      .send({ success: true, blogs: res, count: res.length });
  } else {
    const res = await selectAllVisiblePostsPreview(reader);
    return response
      .status(201)
      .send({ success: true, blogs: res, count: res.length });
  }
}

export async function getPostById(request: Request, response: Response) {
  const validationErrors = validationResult(request);

  if (!validationErrors.isEmpty()) {
    return response.status(400).send({ success: false, msg: "Bad request" });
  }

  const { id } = matchedData(request);
  const res = await selectPostById(id);

  if (res) {
    return response.status(201).send({ success: true, blog: res });
  } else {
    return response.status(400).send({ success: false, msg: "Post not found" });
  }
}

export async function createPost(request: Request, response: Response) {
  const validationErrors = validationResult(request);

  if (!validationErrors.isEmpty()) {
    return response.status(400).send({ success: false, msg: "Bad request" });
  }

  const { author, title, body } = matchedData(request);
  const res = await insertPost({ author, title, body });

  if (res) {
    return response.status(201).send({ success: true, id: res });
  } else {
    return response
      .status(400)
      .send({ success: false, msg: "Unable to create post" });
  }
}
