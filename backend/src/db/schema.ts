import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const Users = pgTable("user", {
  email: varchar("email", { length: 256 }).primaryKey(),
  password: varchar("password", { length: 256 }).notNull(),
});

export const Posts = pgTable("post", {
  id: serial("id").primaryKey(),
  author: varchar("author", { length: 256 })
    .notNull()
    .references(() => Users.email),
  title: varchar("title", { length: 256 }).notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const Follows = pgTable(
  "follows",
  {
    follower: varchar("follower", { length: 256 })
      .references(() => Users.email)
      .notNull(),
    followed: varchar("followed", { length: 256 })
      .references(() => Users.email)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.follower, table.followed] }),
    };
  }
);

export const Blocks = pgTable(
  "blocks",
  {
    blocker: varchar("blocker", { length: 256 })
      .references(() => Users.email)
      .notNull(),
    blocked: varchar("blocked", { length: 256 })
      .references(() => Users.email)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.blocker, table.blocked] }),
    };
  }
);

export const Reads = pgTable(
  "reads",
  {
    reader: varchar("reader", { length: 256 })
      .references(() => Users.email)
      .notNull(),
    post: integer("post")
      .references(() => Posts.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.reader, table.post] }),
    };
  }
);
