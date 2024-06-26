import { Router } from "express";
import {
  insertBlocks,
  insertFollows,
  insertUser,
  selectAllUsers,
  selectAllUsersFollowing,
  selectUserByEmail,
} from "../db/queries/users.js";

const router = Router();

router.get("/", async (request, response) => {
  console.log("get /");

  const { email }: { email: string } = request.params;

  if (email) {
    const res = await selectUserByEmail(email);

    if (res == null) {
      response.status(201).send({ success: false });
    } else {
      response.status(201).send({ success: true, user: res });
    }
  } else {
    const res = await selectAllUsers();
    response.status(201).send({ success: true, users: res, count: res.length });
  }
});

router.post("/", async (request, response) => {
  console.log("post /");
  const { email, password } = request.body;
  const res = await insertUser({ email, password });

  if (res) {
    response.status(201).send({ success: true });
  } else {
    response.status(404).send({ success: false });
  }
});

router.get("/follows", async (request, response) => {
  console.log("get /follows");
  const { users }: { users: string } = request.query;

  if (!users) {
    response.status(404).send({
      success: false,
      msg: `Bad request. Query parameter "users" is required.`,
    });
    return;
  }

  const parsedUsers = users.split(",");
  const res = await selectAllUsersFollowing(parsedUsers);
  response
    .status(201)
    .send({ success: true, followers: res, count: res.length });
});

router.post("/follows", async (request, response) => {
  console.log("post /follows");
  const { follower, followed }: { follower: string; followed: string } =
    request.body;

  if (!follower || !followed) {
    response.status(201).send({ success: false });
    return;
  }

  const res = await insertFollows({ follower, followed });
  response.status(201).send({ success: res });
});

router.post("/blocks", async (request, response) => {
  console.log("post /blocks");
  const { blocker, blocked }: { blocker: string; blocked: string } =
    request.body;

  if (!blocker || !blocked) {
    response.status(201).send({ success: false });
    return;
  }

  const res = await insertBlocks({ blocker, blocked });
  response.status(201).send({ success: res });
});

export default router;
