import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const User = pgTable("user", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 256 }).unique().notNull(),
  password: varchar("password", { length: 256 }),
});

export const Blogpost = pgTable("post", {
  id: serial("id").primaryKey(),
  authorId: integer("authorId").references(() => User.id),
  title: varchar("title", { length: 256 }),
  body: text("body"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const Follows = pgTable(
  "follows",
  {
    followerId: integer("followerId").references(() => User.id),
    followedId: integer("followedId").references(() => User.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.followerId, table.followedId] }),
    };
  }
);

export const Blocks = pgTable(
  "blocks",
  {
    blockerId: integer("blockerId").references(() => User.id),
    blockedId: integer("blockedId").references(() => User.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.blockerId, table.blockedId] }),
    };
  }
);

export const Reads = pgTable(
  "reads",
  {
    userId: integer("userId").references(() => User.id),
    postId: integer("postId").references(() => Blogpost.id),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.postId] }),
    };
  }
);
