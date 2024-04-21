import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: HomePage,
});

type Question = {
  id: number;
  title: string;
  body: string;
};

function HomePage() {
  const { isAuthenticated } = useKindeAuth();
  const { getToken } = useKindeAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      // @ts-ignore
      navigate({ to: "/_authenticated/" });
    }
  }, [isAuthenticated, navigate]);

  // useEffect(() => {
  //   async function getAllQuestions() {
  //     const token = await getToken();
  //     if (!token) {
  //       throw new Error("No token found");
  //     }

  //     try {
  //     const res = await fetch(import.meta.env.VITE_APP_API_URL + "/questions", {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });

  //     console.log(res);

  //     if (!res.ok) {
  //       throw new Error("Failed to fetch questions");
  //     }
  //     return res.json();
  //   }
  //   getAllQuestions();
  //   }
  // }, []);

  useEffect(() => {
    async function getAllQuestions() {
      const token = await getToken();
      if (!token) {
        throw new Error("No token found");
      }
      try {
        const res = await fetch(
          import.meta.env.VITE_APP_API_URL + "/questions",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        // const test = data.map((question: Question) => {
        //   return {
        //     id: question.id,
        //     title: question.title,
        //     body: question.body,
        //   };
        // });

        console.log(data.questions);
        const questionsInData: Question[] = data.questions;

        setQuestions(questionsInData);
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    }
    getAllQuestions();
  }, []);

  // const { isLoading, data, error } = useQuery({
  //   queryKey: ["questions"],
  //   queryFn: getAllQuestions(),
  // });

  // console.log(data);
  return (
    <div className="bg-slate-500 text-white rounded-xl h-screen">
      <div className="p-3">
        <h1 className="font-bold text-2xl">Questions</h1>
        {questions.map((question: any) => (
          <div>
            {/* {isLoading ? (
              "..."
            ) : ( */}
            <div className="grid grid-cols-3 px-20 my-4">
              <p>name</p>
              {/* <div className="flex justify-between px-10 "> */}
              <strong>
                <h2 className="">{question.title}</h2>
              </strong>
              <p>{question.body}</p>
            </div>
            {/* )} */}
            <hr />
          </div>
          // </div>
        ))}
      </div>
    </div>
  );
}
