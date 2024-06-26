import { and, desc, eq, notInArray } from "drizzle-orm";
import { db } from "../index.js";
import { Posts, Reads } from "../schema.js";

export const getPostById = async ({ id }: { id: number }) => {
  const res = await db.select().from(Posts).where(eq(Posts.id, id));

  return res;
};

export const getAllPosts = async () => {
  const res = await db.select().from(Posts).orderBy(desc(Posts.createdAt));

  return res;
};

export const getAllUnreadPostsBy = async ({
  reader,
  author,
}: {
  reader: string;
  author: string;
}) => {
  const res = await db
    .select()
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

  if (!res) {
    return null;
  }
  return res;
};

export const insertPost = async ({
  author,
  title,
  body,
}: typeof Posts.$inferInsert) => {
  const res = await db.insert(Posts).values({ author, title, body });

  return res.rowCount;
};
