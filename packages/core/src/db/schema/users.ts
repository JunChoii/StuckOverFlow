import {
  pgTable,
  text,
  varchar,
  timestamp,
  index,
  numeric,
  serial,
  date,
} from "drizzle-orm/pg-core";

export const user = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 50 }).notNull(),
    email: varchar("email", { length: 100 }).notNull(),
    password: text("password").notNull(),
  }
);