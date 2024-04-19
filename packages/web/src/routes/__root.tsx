import { type QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Outlet,
  Link,
} from "@tanstack/react-router";
import { NotFound } from "@/components/not-found";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootLayout,
  notFoundComponent: NotFound,
});

function RootLayout() {
  const { isAuthenticated } = useKindeAuth();
  return (
    <>
      <div className="p-5 flex flex-col items-center justify-between">
        <Link to="/" className="text-2xl mb-3">
          LeetCodeClone
        </Link>
        <div className="flex gap-x-4 mt-5">
          <Link
            to="/postQuestion"
            className="bg-slate-500 text-white px-4 py-2 rounded-xl"
          >
            Post Question
          </Link>
          {isAuthenticated && (
          <>
            <Link
              to="/profile"
              className="bg-slate-500 text-white px-4 py-2 rounded-xl"
            >
              Profile
            </Link>
            <Link
              to="/profile"
              className="bg-slate-500 text-white px-4 py-2 rounded-xl"
            >
              My Questions
            </Link>
            <Link
              to="/profile"
              className="bg-slate-500 text-white px-4 py-2 rounded-xl"
            >
              My Answers
            </Link>
          </>
          )}
        </div>
      </div>
      <hr />
      <div className=" text-foreground flex flex-col m-10 gap-y-10 max-w-2xl mx-auto">
        <Outlet />
      </div>
    </>
  );
}
