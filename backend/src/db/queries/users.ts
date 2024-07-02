import { eq, inArray } from "drizzle-orm";
import { db } from "../index.js";
import { Blocks, Follows, Users } from "../schema.js";

export const selectUserByEmail = async (email: string) => {
  const res = await db.select().from(Users).where(eq(Users.email, email));

  if (res.length == 0) {
    return null;
  }
  return res[0];
};

export const selectAllUsers = async () => {
  const res = await db.select().from(Users);

  return res;
};

export const selectAllUsersFollowedBy = async (follower: string) => {
  const res = await db
    .select({ followed: Follows.followed })
    .from(Follows)
    .where(eq(Follows.follower, follower));

  return res;
};

export const selectAllUsersFollowing = async (followed: string[]) => {
  const res = await db
    .select({ follower: Follows.follower })
    .from(Follows)
    .where(inArray(Follows.followed, followed));

  return res.map((e) => e.follower);
};

export const insertUser = async ({
  email,
  password,
}: typeof Users.$inferInsert) => {
  const res = await db
    .insert(Users)
    .values({ email, password })
    .returning({ email: Users.email })
    .onConflictDoNothing();

  if (res.length == 0) {
    return null;
  } else {
    return res[0].email;
  }
};

export const insertFollows = async ({
  follower,
  followed,
}: {
  follower: string;
  followed: string;
}) => {
  const res = await db
    .insert(Follows)
    .values({ follower, followed })
    .returning({ follower: Follows.follower, followed: Follows.followed })
    .onConflictDoNothing();

  if (res.length == 0) {
    return null;
  } else {
    return res[0];
  }
};

export const insertBlocks = async ({
  blocker,
  blocked,
}: {
  blocker: string;
  blocked: string;
}) => {
  const res = await db
    .insert(Blocks)
    .values({ blocker, blocked })
    .returning({ blocker: Blocks.blocker, blocked: Blocks.blocked })
    .onConflictDoNothing();

  if (res.length == 0) {
    return null;
  } else {
    return res[0];
  }
};
