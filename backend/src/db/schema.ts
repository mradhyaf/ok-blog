import {
  integer,
  pgSchema,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const mySchema = pgSchema("ok_blog");

export const Users = mySchema.table("user", {
  email: varchar("email", { length: 256 }).primaryKey(),
  password: varchar("password", { length: 256 }).notNull(),
});

export const Posts = mySchema.table("post", {
  id: serial("id").primaryKey(),
  author: varchar("author", { length: 256 })
    .notNull()
    .references(() => Users.email, { onDelete: "cascade" }),
  title: varchar("title", { length: 256 }).notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const Follows = mySchema.table(
  "follows",
  {
    follower: varchar("follower", { length: 256 })
      .references(() => Users.email, { onDelete: "cascade" })
      .notNull(),
    followed: varchar("followed", { length: 256 })
      .references(() => Users.email, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.follower, table.followed] }),
    };
  }
);

export const Blocks = mySchema.table(
  "blocks",
  {
    blocker: varchar("blocker", { length: 256 })
      .references(() => Users.email, { onDelete: "cascade" })
      .notNull(),
    blocked: varchar("blocked", { length: 256 })
      .references(() => Users.email, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.blocker, table.blocked] }),
    };
  }
);

export const Reads = mySchema.table(
  "reads",
  {
    reader: varchar("reader", { length: 256 })
      .references(() => Users.email, { onDelete: "cascade" })
      .notNull(),
    post: integer("post")
      .references(() => Posts.id, { onDelete: "cascade" })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.reader, table.post] }),
    };
  }
);

export default mySchema;
