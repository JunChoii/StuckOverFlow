import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

const app = new Hono();

const fakeQuestions = [
  {
    id: 1,
    title: "What is leetCodeClone?",
    body: "I heard it's a clone of leetcode",
  },
  {
    id: 2,
    title: "What is Hono?",
    body: "It's a web framework",
  },
  {
    id: 3,
    title: "What is SST?",
    body: "It's a serverless stack",
  },
];

app.get("/questions", (c) => {
  return c.json({ questions: fakeQuestions });
});

app.post("/questions", async (c) => {
  const body = await c.req.json();
  const question = body.question;
  fakeQuestions.push({
    ...question,
    id: (fakeQuestions.length + 1).toString(),
  });
  return c.json({ questions: fakeQuestions });
});

export const handler = handle(app);
