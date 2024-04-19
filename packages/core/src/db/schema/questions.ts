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
import { title } from "process";
import { z } from "zod";

export const questions = pgTable(
  "questions",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: varchar("title", { length: 100 }).notNull(),
    body: varchar("body", { length: 1000 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      nameIdx: index("userId_idx").on(table.userId),
    };
  }
);
