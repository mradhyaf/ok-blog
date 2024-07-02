import { Router } from "express";
import { checkSchema } from "express-validator";
import { createPost, getPostById, getPostsPreview } from "../handlers/posts.js";
import {
  createPostValidationSchema,
  getPostByIdValidationSchema,
  getPostsPreviewValidationSchema,
} from "../middleware/validationSchemas.js";

const router = Router();

router.get("/", checkSchema(getPostsPreviewValidationSchema), getPostsPreview);

router.get("/:id", checkSchema(getPostByIdValidationSchema), getPostById);

router.post("/", checkSchema(createPostValidationSchema), createPost);

export default router;
