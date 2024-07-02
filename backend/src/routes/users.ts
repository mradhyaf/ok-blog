import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  createBlocksRelationship,
  createFollowsRelationship,
  createUser,
  getFollowers,
  getUser,
} from "../handlers/users.js";
import {
  createBlocksRelationshipValidationSchema,
  createFollowsRelationshipValidationSchema,
  createUserValidationSchema,
  getFollowersValidationSchema,
  getUserValidationSchema,
} from "../middleware/validationSchemas.js";

const router = Router();

router.get("/", checkSchema(getUserValidationSchema), getUser);

router.post("/", checkSchema(createUserValidationSchema), createUser);

router.get("/follows", checkSchema(getFollowersValidationSchema), getFollowers);

router.post(
  "/follows",
  checkSchema(createFollowsRelationshipValidationSchema),
  createFollowsRelationship
);

router.post(
  "/blocks",
  checkSchema(createBlocksRelationshipValidationSchema),
  createBlocksRelationship
);

export default router;
