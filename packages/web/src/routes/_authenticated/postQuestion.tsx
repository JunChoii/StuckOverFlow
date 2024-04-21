import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const Route = createFileRoute("/_authenticated/postQuestion")({
  component: PostQuestion,
});

type Question = {
  id: number;
  title: string;
  body: string;
  // imageUrl: string;
};

function PostQuestion() {
  const { getToken } = useKindeAuth();
  const navigate = useNavigate();
  const [newQuestion, setNewQuestion] = useState<Question>({
    id: 0,
    title: "",
    body: "",
    // imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = await getToken();
    if (!token) {
      throw new Error("No token found");
    }
    try {
      const res = await fetch(import.meta.env.VITE_APP_API_URL + "/questions", {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          question: {
            ...newQuestion,
            title: newQuestion.title,
            body: newQuestion.body,
          },
        }),
      });
      console.log(res);

      if (!res.ok) {
        throw new Error("Failed to post question");
      }

      navigate({ to: "/" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-slate-500 text-white w-full p-5 rounded-xl">
        <h1>Post Question</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-between"
        >
          <input
            type="text"
            placeholder="Title"
            value={newQuestion.title}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, title: e.target.value })
            }
            className="w-full p-2 rounded-xl bg-slate-100 text-black border-none focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 mb-5 mt-3"
          />
          <textarea
            placeholder="Body"
            value={newQuestion.body}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, body: e.target.value })
            }
            className="w-full h-40 p-2 rounded-xl bg-slate-100 text-black border-none focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 mb-10"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
