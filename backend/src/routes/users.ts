import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  createBlocksRelationship,
  createFollowsRelationship,
  createUser,
  getFollowers,
} from "../handlers/users.js";
import {
  createBlocksRelationshipValidationSchema,
  createFollowsRelationshipValidationSchema,
  createUserValidationSchema,
  getFollowersValidationSchema,
} from "../middleware/validation-schemas.js";

const router = Router();

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
