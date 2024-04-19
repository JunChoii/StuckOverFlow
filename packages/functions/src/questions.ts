import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

import { questions as questionsTable } from "@leetCodeClone/core/db/schema/questions";
import { db } from "@leetCodeClone/core/db";

const app = new Hono();

app.get("/questions", async (c) => {
  const questions = await db.select().from(questionsTable);
  return c.json({ questions });
});

app.post("/questions", async (c) => {
  const body = await c.req.json();
  const question = { ...body.question, userId: "dummy-user-id"};
  const newQuestion = await db
    .insert(questionsTable)
    .values(question)
    .returning();
  return c.json({ questions: newQuestion });
});

export const handler = handle(app);
