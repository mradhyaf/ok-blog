import { and, desc, eq, notInArray } from "drizzle-orm";
import { db } from "../index.js";
import { Blocks, Posts, Reads } from "../schema.js";

export const selectPostById = async (id: number) => {
  const res = await db.select().from(Posts).where(eq(Posts.id, id));

  if (res.length == 0) {
    return null;
  }
  return res[0];
};

export const selectAllVisiblePostsPreview = async (reader: string) => {
  const res = await db
    .select({
      id: Posts.id,
      author: Posts.author,
      title: Posts.title,
      createdAt: Posts.createdAt,
    })
    .from(Posts)
    .where(
      notInArray(
        Posts.author,
        db
          .select({ author: Blocks.blocker })
          .from(Blocks)
          .where(eq(Blocks.blocked, reader))
      )
    )
    .orderBy(desc(Posts.createdAt));

  return res;
};

export const selectAllUnreadPostsPreviewBy = async ({
  author,
  reader,
}: {
  reader: string;
  author: string;
}) => {
  const res = await db
    .select({
      id: Posts.id,
      author: Posts.author,
      title: Posts.title,
      createdAt: Posts.createdAt,
    })
    .from(Posts)
    .where(
      and(
        eq(Posts.author, author),
        notInArray(
          Posts.id,
          db
            .select({ id: Reads.post })
            .from(Reads)
            .where(eq(Reads.reader, reader))
        )
      )
    )
    .orderBy(desc(Posts.createdAt));

  return res;
};

export const insertPost = async ({
  author,
  title,
  body,
}: typeof Posts.$inferInsert) => {
  const res = await db
    .insert(Posts)
    .values({ author, title, body })
    .returning({ id: Posts.id })
    .onConflictDoNothing();

  if (res.length == 0) {
    return null;
  } else {
    return res[0].id;
  }
};
