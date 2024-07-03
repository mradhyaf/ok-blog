import { Request, Response } from "express";
import { matchedData, validationResult } from "express-validator";
import {
  insertBlocks,
  insertFollows,
  insertUser,
  selectAllUsersFollowing,
} from "../db/queries/users.js";

export async function createUser(request: Request, response: Response) {
  const validationErrors = validationResult(request);

  if (!validationErrors.isEmpty()) {
    return response.status(400).send({ success: false, msg: "Bad request" });
  }

  const { email, password } = matchedData(request);
  const res = await insertUser({ email, password });

  if (!res) {
    return response
      .status(500)
      .send({ success: false, msg: "Unable to create user" });
  }

  request.session.user = { email: res };
  return response.status(201).send({ success: true, user: { email: res } });
}

export async function getFollowers(request: Request, response: Response) {
  const validationErrors = validationResult(request);

  if (!validationErrors.isEmpty()) {
    return response.status(400).send({ success: false, msg: "Bad request" });
  }

  const { emails } = matchedData(request);
  const res = await selectAllUsersFollowing(emails);

  return response
    .status(201)
    .send({ success: true, followers: res, count: res.length });
}

export async function createFollowsRelationship(
  request: Request,
  response: Response
) {
  const validationErrors = validationResult(request);

  if (!validationErrors.isEmpty()) {
    return response.status(400).send({ success: false, msg: "Bad request" });
  }

  const { follower, followed } = matchedData(request);
  const res = await insertFollows({ follower, followed });

  if (res == null) {
    response.status(400).send({ success: false, msg: "Unable to follow user" });
  } else {
    response.status(201).send({ success: true });
  }
}

export async function createBlocksRelationship(
  request: Request,
  response: Response
) {
  const validationErrors = validationResult(request);

  if (!validationErrors.isEmpty()) {
    return response.status(400).send({ success: false, msg: "Bad request" });
  }

  const { blocker, blocked } = matchedData(request);
  const res = await insertBlocks({ blocker, blocked });

  if (res == null) {
    response.status(400).send({ success: false, msg: "Unable to block user" });
  } else {
    response.status(201).send({ success: true });
  }
}
