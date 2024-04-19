import { createMiddleware } from "hono/factory";
import { LambdaContext, LambdaEvent, handle } from "hono/aws-lambda";

type EnhancedLambdaEvent = LambdaEvent & {
  requestContext?: {
    authorizer: {
      jwt: {
        claims: {
          sub: string;
        };
      };
    };
  };
};

type AuthEnv = {
  Variables: {
    userId: string;
  };
  Bindings: {
    event: EnhancedLambdaEvent;
    context: LambdaContext;
  };
};

export const authMiddleware = createMiddleware<AuthEnv>(async (c, next) => {
  const userId = c.env.event.requestContext?.authorizer?.jwt?.claims.sub;
  c.set("userId", userId);
  await next();
});