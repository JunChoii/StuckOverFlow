import { Hono } from "hono";
import { LambdaContext, LambdaEvent, handle } from "hono/aws-lambda";

import { questions as questionsTable } from "@leetCodeClone/core/db/schema/questions";
import { db } from "@leetCodeClone/core/db";
import { authMiddleware } from "@leetCodeClone/core/auth";
import { eq } from "drizzle-orm";

const app = new Hono();

app.get("/questions", async (c) => {
  const userId = c.var.userId;
  console.log(userId);
  const questions = await db
    .select()
    .from(questionsTable).execute();
    // .where(eq(questionsTable.userId, userId));
  return c.json({ questions });
});

// app.post("/questions", async (c) => {
//   // const userId = c.var.userId;

//   const body = await c.req.json();
//   const question = { ...body.question };
//   const newQuestion = await db
//     .insert(questionsTable)
//     .values(question)
//     .returning();
//   return c.json({ questions: newQuestion });
// });

app.post("/questions", async (c) => {
  const body = await c.req.json();
  const questions = body.questions;
  const newQuestions = await db.insert(questionsTable).values(questions).returning();
  return c.json({ quiz: newQuestions });
});

export const handler = handle(app);
