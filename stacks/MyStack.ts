import { StackContext, Api, StaticSite } from "sst/constructs";

export function API({ stack }: StackContext) {
  const audience = `api-leetcodecloneApp-${stack.stage}`;

  const api = new Api(stack, "api", {
    authorizers: {
      myAuthorizer: {
        type: "jwt",
        jwt: {
          issuer: "https://leetcodeclone.kinde.com",
          audience: [audience],
        },
      },
    },
    defaults: {
      authorizer: "myAuthorizer",
      function: {
        environment: {
          DRIZZLE_DATABASE_URL: process.env.DRIZZLE_DATABASE_URL!,
        },
      },
    },
    routes: {
      "GET /": {
        authorizer: "none",
        function: { handler: "packages/functions/src/lambda.handler" },
      },
      "GET /users": "packages/functions/src/users.handler", // get all users
      "POST /users": "packages/functions/src/users.handler", // create a user
      "GET /questions": "packages/functions/src/questions.handler", // get all questions
      "POST /questions": "packages/functions/src/questions.handler", // create a question
      "GET /questions/{id}": "packages/functions/src/questions.handler", // get a question by id
      "GET /questions/{id}/answers": "packages/functions/src/answers.handler", // get all answers for a question
      "POST /questions/{id}/answers": "packages/functions/src/answers.handler", // create an answer for a question
    },
  });

  const web = new StaticSite(stack, "web", {
    path: "packages/web",
    buildOutput: "dist",
    buildCommand: "npm run build",
    environment: {
      VITE_APP_API_URL: api.url,
      VITE_APP_KINDE_AUDIENCE: audience,
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebsiteURL: web.url,
  });
}
