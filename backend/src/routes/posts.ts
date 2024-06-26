import { Router } from "express";
import {
  insertPost,
  selectAllPostsTitle,
  selectAllUnreadPostsTitleBy,
  selectPostById,
} from "../db/queries/posts.js";

const router = Router();

router.get("/", async (request, response) => {
  const { author, reader }: { author: string; reader: string } = request.query;

  if (author && reader) {
    const res = await selectAllUnreadPostsTitleBy({ reader, author });
    response.status(201).send({ success: true, blogs: res });
    return;
  }

  const res = await selectAllPostsTitle();
  response.status(201).send({ success: true, blogs: res });
});

router.get("/:id", async (request, response) => {
  const { id }: { id: number } = request.params;

  const res = await selectPostById({ id });
  response.status(201).send({ success: true, post: res });
});

router.post("/", async (request, response) => {
  const { author, title, body } = request.body;

  const res = await insertPost({ author, title, body });
  response.status(201).send({ success: res });
});

export default router;
