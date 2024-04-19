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

export const answers = pgTable(
  "answers",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    questionId: text("question_id").notNull(),
    body: varchar("body", { length: 1000 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => {
    return {
      userQuestionIdx: index("user_question_idx")
        .on(table.userId, table.questionId)
    };
  }
);