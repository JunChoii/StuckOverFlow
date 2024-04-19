import { StackContext, Api, StaticSite } from "sst/constructs";

export function API({ stack }: StackContext) {

  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      // "GET /users": "packages/functions/src/users.handler", // get all users
      // "POST /users": "packages/functions/src/users.handler", // create a user
      "GET /questions": "packages/functions/src/questions.handler", // get all questions
      "POST /questions": "packages/functions/src/questions.handler", // create a question
      // "GET /questions/{id}": "packages/functions/src/questions.handler", // get a question by id
      // "GET /questions/{id}/answers": "packages/functions/src/answers.handler", // get all answers for a question
      // "POST /questions/{id}/answers": "packages/functions/src/answers.handler", // create an answer for a question
    },
  });

  const web = new StaticSite(stack, "web", {
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_APP_API_URL: api.url,
    },
  })


  stack.addOutputs({
    ApiEndpoint: api.url,
    WebsiteURL: web.url,
  });
}
